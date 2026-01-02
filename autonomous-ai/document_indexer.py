#!/usr/bin/env python3
"""
LUXBIN Codebase Document Indexer
Indexes all LUXBIN files (Rust, Python, Solidity, TypeScript, docs) for RAG system
"""

import os
import sys
from pathlib import Path
from typing import List, Dict, Any
import chromadb
from sentence_transformers import SentenceTransformer
import PyPDF2
import docx
from bs4 import BeautifulSoup
import json
from tqdm import tqdm
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LuxbinDocumentIndexer:
    def __init__(self, chroma_path="./luxbin_chroma_db", model_name="all-MiniLM-L6-v2"):
        """Initialize the document indexer with ChromaDB and sentence transformer."""
        self.chroma_path = chroma_path
        self.model_name = model_name

        # Initialize ChromaDB client
        self.chroma_client = chromadb.PersistentClient(path=chroma_path)

        # Initialize sentence transformer for embeddings
        self.embedding_model = SentenceTransformer(model_name)

        # Create or get collection
        self.collection = self.chroma_client.get_or_create_collection(
            name="luxbin_codebase",
            metadata={"description": "LUXBIN blockchain and AI codebase"}
        )

        logger.info(f"Initialized indexer with ChromaDB at {chroma_path}")

    def get_file_extensions(self) -> List[str]:
        """Return list of file extensions to index."""
        return [
            # Code files
            '.rs',      # Rust
            '.py',      # Python
            '.sol',     # Solidity
            '.ts',      # TypeScript
            '.js',      # JavaScript
            '.tsx',     # React TypeScript
            '.jsx',     # React JavaScript

            # Documentation
            '.md',      # Markdown
            '.txt',     # Text files
            '.pdf',     # PDF documents
            '.docx',    # Word documents
            '.html',    # HTML files
            '.json',    # JSON configs
            '.toml',    # TOML configs
            '.yaml',    # YAML configs
            '.yml',     # YAML configs
        ]

    def should_index_file(self, file_path: Path) -> bool:
        """Check if file should be indexed."""
        # Skip common exclude patterns
        exclude_patterns = [
            '__pycache__',
            'node_modules',
            '.git',
            'target',
            '.cargo',
            'build',
            'dist',
            '.DS_Store',
            '*.log',
            'luxbin_chroma_db',  # Don't index our own DB
        ]

        file_str = str(file_path)

        # Check if file is in excluded directory
        for pattern in exclude_patterns:
            if pattern in file_str:
                return False

        # Check file extension
        if file_path.suffix.lower() in self.get_file_extensions():
            return True

        return False

    def extract_text_from_file(self, file_path: Path) -> str:
        """Extract text content from various file types."""
        try:
            if file_path.suffix.lower() == '.pdf':
                return self._extract_pdf_text(file_path)
            elif file_path.suffix.lower() == '.docx':
                return self._extract_docx_text(file_path)
            elif file_path.suffix.lower() in ['.html', '.htm']:
                return self._extract_html_text(file_path)
            else:
                # Plain text files (including code)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    return f.read()
        except Exception as e:
            logger.warning(f"Failed to extract text from {file_path}: {e}")
            return ""

    def _extract_pdf_text(self, file_path: Path) -> str:
        """Extract text from PDF files."""
        text = ""
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        return text

    def _extract_docx_text(self, file_path: Path) -> str:
        """Extract text from Word documents."""
        doc = docx.Document(file_path)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text

    def _extract_html_text(self, file_path: Path) -> str:
        """Extract text from HTML files."""
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
            return soup.get_text()

    def chunk_text(self, text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
        """Split text into overlapping chunks for better retrieval."""
        chunks = []
        start = 0

        while start < len(text):
            end = start + chunk_size
            chunk = text[start:end]

            # Don't cut in the middle of a word
            if end < len(text):
                last_space = chunk.rfind(' ')
                if last_space > chunk_size // 2:
                    end = start + last_space
                    chunk = text[start:end]

            chunks.append(chunk)
            start = end - overlap

            if start >= len(text):
                break

        return chunks

    def index_file(self, file_path: Path, base_path: Path) -> int:
        """Index a single file and return number of chunks added."""
        if not self.should_index_file(file_path):
            return 0

        # Extract text
        text = self.extract_text_from_file(file_path)
        if not text.strip():
            return 0

        # Create chunks
        chunks = self.chunk_text(text)

        # Create embeddings
        embeddings = self.embedding_model.encode(chunks)

        # Prepare metadata and IDs
        relative_path = file_path.relative_to(base_path)
        file_metadata = {
            "file_path": str(relative_path),
            "file_name": file_path.name,
            "file_extension": file_path.suffix,
            "file_size": file_path.stat().st_size,
            "language": self._detect_language(file_path),
        }

        # Add to ChromaDB
        ids = [f"{relative_path}_{i}" for i in range(len(chunks))]
        metadatas = [file_metadata.copy() for _ in chunks]
        documents = chunks

        self.collection.add(
            embeddings=embeddings.tolist(),
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )

        return len(chunks)

    def _detect_language(self, file_path: Path) -> str:
        """Detect programming language from file extension."""
        ext_to_lang = {
            '.rs': 'rust',
            '.py': 'python',
            '.sol': 'solidity',
            '.ts': 'typescript',
            '.js': 'javascript',
            '.tsx': 'typescript',
            '.jsx': 'javascript',
            '.md': 'markdown',
            '.txt': 'text',
            '.json': 'json',
            '.toml': 'toml',
            '.yaml': 'yaml',
            '.yml': 'yaml',
            '.html': 'html',
            '.pdf': 'pdf',
            '.docx': 'docx',
        }
        return ext_to_lang.get(file_path.suffix.lower(), 'unknown')

    def index_codebase(self, codebase_path: str = "../../") -> Dict[str, Any]:
        """Index the entire LUXBIN codebase."""
        base_path = Path(codebase_path).resolve()

        if not base_path.exists():
            raise ValueError(f"Codebase path does not exist: {base_path}")

        logger.info(f"Starting to index codebase at: {base_path}")

        # Get all files to index
        all_files = []
        for ext in self.get_file_extensions():
            all_files.extend(base_path.rglob(f"*{ext}"))

        # Filter files
        files_to_index = [f for f in all_files if self.should_index_file(f)]
        logger.info(f"Found {len(files_to_index)} files to index")

        # Index files with progress bar
        total_chunks = 0
        indexed_files = 0

        with tqdm(total=len(files_to_index), desc="Indexing files") as pbar:
            for file_path in files_to_index:
                try:
                    chunks_added = self.index_file(file_path, base_path)
                    total_chunks += chunks_added
                    indexed_files += 1
                except Exception as e:
                    logger.error(f"Failed to index {file_path}: {e}")
                pbar.update(1)

        result = {
            "total_files": len(files_to_index),
            "indexed_files": indexed_files,
            "total_chunks": total_chunks,
            "database_path": self.chroma_path,
            "collection_name": "luxbin_codebase"
        }

        logger.info(f"Indexing complete: {result}")
        return result

    def search_similar(self, query: str, n_results: int = 5) -> Dict[str, Any]:
        """Search for similar content in the indexed codebase."""
        # Create embedding for query
        query_embedding = self.embedding_model.encode([query])[0]

        # Search ChromaDB
        results = self.collection.query(
            query_embeddings=[query_embedding.tolist()],
            n_results=n_results,
            include=['documents', 'metadatas', 'distances']
        )

        # Format results
        formatted_results = []
        if results['documents'] and results['documents'][0]:
            for i, doc in enumerate(results['documents'][0]):
                metadata = results['metadatas'][0][i] if results['metadatas'] else {}
                distance = results['distances'][0][i] if results['distances'] else 0

                formatted_results.append({
                    'content': doc,
                    'metadata': metadata,
                    'similarity_score': 1 - distance,  # Convert distance to similarity
                    'file_path': metadata.get('file_path', 'unknown'),
                    'language': metadata.get('language', 'unknown')
                })

        return {
            'query': query,
            'results': formatted_results,
            'total_results': len(formatted_results)
        }

def main():
    """Main function to run the indexer."""
    import argparse

    parser = argparse.ArgumentParser(description="Index LUXBIN codebase for RAG")
    parser.add_argument("--codebase-path", default="../../", help="Path to LUXBIN codebase")
    parser.add_argument("--db-path", default="./luxbin_chroma_db", help="Path for ChromaDB")

    args = parser.parse_args()

    # Initialize indexer
    indexer = LuxbinDocumentIndexer(chroma_path=args.db_path)

    # Index codebase
    result = indexer.index_codebase(args.codebase_path)

    # Save results
    with open("indexing_results.json", "w") as f:
        json.dump(result, f, indent=2)

    print("Indexing complete!")
    print(f"Indexed {result['indexed_files']} files")
    print(f"Created {result['total_chunks']} chunks")
    print(f"Database saved to: {result['database_path']}")

if __name__ == "__main__":
    main()