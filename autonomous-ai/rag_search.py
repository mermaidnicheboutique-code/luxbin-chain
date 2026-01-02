#!/usr/bin/env python3
"""
LUXBIN RAG (Retrieval-Augmented Generation) Search System
Provides semantic search capabilities for the autonomous AI
"""

import os
from pathlib import Path
from typing import List, Dict, Any, Optional
from document_indexer import LuxbinDocumentIndexer
import json

class LuxbinRAGSearch:
    def __init__(self, chroma_path: str = "./luxbin_chroma_db"):
        self.indexer = LuxbinDocumentIndexer(chroma_path=chroma_path)
        self.collection_name = "luxbin_codebase"

    def search_codebase(self, query: str, n_results: int = 5) -> Dict[str, Any]:
        """
        Search the LUXBIN codebase for relevant information

        Args:
            query: The search query
            n_results: Number of results to return

        Returns:
            Dictionary containing search results and metadata
        """
        try:
            results = self.indexer.search_similar(query, self.collection_name, n_results)

            # Format results for AI consumption
            formatted_results = []
            unique_files = set()

            if results['documents'] and results['documents'][0]:
                for i, (doc, metadata, distance) in enumerate(zip(
                    results['documents'][0],
                    results['metadatas'][0],
                    results['distances'][0]
                )):
                    file_path = metadata['file_path']
                    unique_files.add(file_path)

                    formatted_results.append({
                        'rank': i + 1,
                        'file_path': file_path,
                        'language': metadata.get('language', 'unknown'),
                        'content': doc[:500] + '...' if len(doc) > 500 else doc,
                        'relevance_score': 1 - distance,  # Convert distance to similarity score
                        'chunk_index': metadata.get('chunk_index', 0),
                        'total_chunks': metadata.get('total_chunks', 1)
                    })

            return {
                'query': query,
                'total_results': len(formatted_results),
                'unique_files': len(unique_files),
                'results': formatted_results,
                'search_success': True
            }

        except Exception as e:
            return {
                'query': query,
                'error': str(e),
                'search_success': False,
                'results': []
            }

    def get_file_context(self, file_path: str, max_lines: int = 50) -> Optional[str]:
        """
        Get full context of a specific file

        Args:
            file_path: Relative path to the file
            max_lines: Maximum lines to return

        Returns:
            File content or None if not found
        """
        try:
            full_path = self.indexer.repo_path / file_path
            if full_path.exists():
                content = self.indexer.read_file_content(full_path)
                lines = content.split('\n')
                if len(lines) > max_lines:
                    content = '\n'.join(lines[:max_lines]) + f'\n... ({len(lines) - max_lines} more lines)'
                return content
        except Exception as e:
            print(f"Error reading file {file_path}: {e}")

        return None

    def explain_code_feature(self, feature_query: str) -> str:
        """
        Explain how a specific feature works by searching the codebase

        Args:
            feature_query: Description of the feature to explain

        Returns:
            Explanation based on code search
        """
        search_results = self.search_codebase(feature_query, n_results=3)

        if not search_results['search_success'] or not search_results['results']:
            return f"I couldn't find information about '{feature_query}' in the codebase. The feature might not be implemented yet or needs different search terms."

        explanation = f"🔍 Searched {search_results['unique_files']} files for '{feature_query}':\n\n"

        for result in search_results['results'][:2]:  # Show top 2 results
            explanation += f"**File: {result['file_path']}** ({result['language']})\n"
            explanation += f"Relevance: {result['relevance_score']:.2%}\n"
            explanation += f"```\n{result['content']}\n```\n\n"

            # Try to get more context if it's a key file
            if result['relevance_score'] > 0.7:
                full_context = self.get_file_context(result['file_path'], max_lines=30)
                if full_context:
                    explanation += f"**Full context from {result['file_path']}:**\n```\n{full_context}\n```\n\n"

        return explanation

    def get_database_stats(self) -> Dict[str, Any]:
        """Get statistics about the indexed database"""
        stats = self.indexer.get_collection_stats()
        return {
            'total_chunks_indexed': stats['total_chunks'],
            'database_path': str(self.indexer.chroma_path),
            'supported_languages': list(self.indexer.supported_extensions.keys())
        }


# Standalone functions for easy integration
def search_luxbin_codebase(query: str, n_results: int = 5) -> Dict[str, Any]:
    """Convenience function to search the LUXBIN codebase"""
    rag = LuxbinRAGSearch()
    return rag.search_codebase(query, n_results)

def explain_luxbin_feature(feature: str) -> str:
    """Convenience function to explain LUXBIN features"""
    rag = LuxbinRAGSearch()
    return rag.explain_code_feature(feature)

def get_luxbin_stats() -> Dict[str, Any]:
    """Convenience function to get database statistics"""
    rag = LuxbinRAGSearch()
    return rag.get_database_stats()


def main():
    """Test the RAG search system"""
    import argparse

    parser = argparse.ArgumentParser(description="Test LUXBIN RAG Search")
    parser.add_argument("query", help="Search query")
    parser.add_argument("--results", type=int, default=3, help="Number of results")

    args = parser.parse_args()

    print(f"Searching for: '{args.query}'")
    print("=" * 50)

    results = search_luxbin_codebase(args.query, args.results)

    if results['search_success']:
        print(f"✅ Found {results['total_results']} results from {results['unique_files']} files:")
        print()

        for result in results['results']:
            print(f"📄 {result['file_path']} ({result['language']})")
            print(".2%")
            print(f"💻 {result['content']}")
            print("-" * 30)
    else:
        print(f"❌ Search failed: {results.get('error', 'Unknown error')}")

    # Get stats
    stats = get_luxbin_stats()
    print(f"\n📊 Database contains {stats['total_chunks_indexed']} indexed chunks")


if __name__ == "__main__":
    main()