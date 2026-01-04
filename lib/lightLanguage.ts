/**
 * Light Language System
 * Translates memories and knowledge into photonic sequences
 * Based on diamond quantum computer's NV center encoding
 */

export interface PhotonicSequence {
  wavelengths: number[]; // nanometers
  colors: ('Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Indigo' | 'Violet')[];
  frequencies: number[]; // Hz
  meaning: string;
  energyLevel: number; // 0-100
  coherence: number; // 0-1
}

export interface LightMemory {
  id: string;
  originalText: string;
  photonicSequence: PhotonicSequence;
  emotionalResonance: string;
  category: string;
  timestamp: number;
  contractAddress?: string; // If deployed as smart contract
}

/**
 * Color-to-meaning mappings based on photonic states
 */
const COLOR_MEANINGS: Record<string, string> = {
  'Red': 'Foundation/Security/Survival',
  'Orange': 'Creativity/Emotion/Flow',
  'Yellow': 'Power/Intelligence/Will',
  'Green': 'Love/Healing/Growth',
  'Blue': 'Truth/Communication/Expression',
  'Indigo': 'Intuition/Vision/Insight',
  'Violet': 'Consciousness/Transcendence/Unity'
};

const COLOR_WAVELENGTHS: Record<string, number> = {
  'Red': 700,
  'Orange': 620,
  'Yellow': 580,
  'Green': 530,
  'Blue': 470,
  'Indigo': 450,
  'Violet': 400
};

const COLOR_FREQUENCIES: Record<string, number> = {
  'Red': 428_000_000_000_000, // THz
  'Orange': 484_000_000_000_000,
  'Yellow': 517_000_000_000_000,
  'Green': 566_000_000_000_000,
  'Blue': 638_000_000_000_000,
  'Indigo': 667_000_000_000_000,
  'Violet': 750_000_000_000_000
};

/**
 * Translate text into light language (photonic sequence)
 */
export function translateToLight(text: string, category?: string): PhotonicSequence {
  // Analyze semantic content to determine color sequence
  const words = text.toLowerCase().split(/\s+/);
  const colors: PhotonicSequence['colors'] = [];
  const wavelengths: number[] = [];
  const frequencies: number[] = [];

  // Map words to colors based on semantic meaning
  for (const word of words) {
    const color = wordToColor(word, category);
    colors.push(color);
    wavelengths.push(COLOR_WAVELENGTHS[color]);
    frequencies.push(COLOR_FREQUENCIES[color]);
  }

  // Calculate energy level (based on word intensity and category)
  const energyLevel = calculateEnergyLevel(text, category);

  // Calculate coherence (how well-structured the knowledge is)
  const coherence = calculateCoherence(text);

  return {
    wavelengths,
    colors,
    frequencies,
    meaning: extractMeaning(colors),
    energyLevel,
    coherence
  };
}

/**
 * Map individual words to photonic colors
 */
function wordToColor(word: string, category?: string): PhotonicSequence['colors'][number] {
  // Hermetic/Spiritual words
  if (/sacred|divine|spirit|soul|god|holy|transcend|mystical/.test(word)) return 'Violet';
  if (/wisdom|insight|vision|see|perceive|understand/.test(word)) return 'Indigo';
  if (/truth|speak|communicate|express|say|tell/.test(word)) return 'Blue';
  if (/love|heal|heart|grow|compassion|care/.test(word)) return 'Green';
  if (/power|will|think|mind|intelligence|know/.test(word)) return 'Yellow';
  if (/create|emotion|feel|flow|passion|desire/.test(word)) return 'Orange';
  if (/ground|foundation|secure|safe|survive|protect/.test(word)) return 'Red';

  // Quantum/Technology words
  if (/quantum|superposition|entangle|coherence/.test(word)) return 'Violet';
  if (/neural|network|ai|intelligence/.test(word)) return 'Indigo';
  if (/data|information|knowledge|learn/.test(word)) return 'Blue';
  if (/blockchain|chain|link|connect/.test(word)) return 'Green';
  if (/compute|process|calculate|algorithm/.test(word)) return 'Yellow';
  if (/energy|power|force|wave/.test(word)) return 'Orange';
  if (/bitcoin|crypto|token|secure/.test(word)) return 'Red';

  // Category-based defaults
  if (category === 'spirituality') return 'Violet';
  if (category === 'technology') return 'Blue';
  if (category === 'science') return 'Yellow';
  if (category === 'philosophy') return 'Indigo';

  // Default based on word length (chaos encoding)
  const colorIndex = word.length % 7;
  return ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'][colorIndex] as any;
}

/**
 * Calculate energy level of the knowledge
 */
function calculateEnergyLevel(text: string, category?: string): number {
  let energy = 50; // Base energy

  // High-energy keywords
  const highEnergyWords = /breakthrough|discovery|revolution|advanced|quantum|transcend|enlighten/gi;
  const matches = text.match(highEnergyWords);
  if (matches) energy += matches.length * 10;

  // Category modifiers
  if (category === 'technology') energy += 15;
  if (category === 'spirituality') energy += 20;
  if (category === 'science') energy += 10;

  // Text length factor (more detailed = more energy)
  energy += Math.min(text.length / 100, 20);

  return Math.min(energy, 100);
}

/**
 * Calculate coherence (how well-structured)
 */
function calculateCoherence(text: string): number {
  let coherence = 0.5;

  // Well-structured text has proper punctuation
  if (/[.!?]/.test(text)) coherence += 0.2;

  // Has multiple sentences
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
  if (sentences.length > 1) coherence += 0.1;

  // Not too short, not too long
  if (text.length > 50 && text.length < 500) coherence += 0.2;

  return Math.min(coherence, 1.0);
}

/**
 * Extract overall meaning from color sequence
 */
function extractMeaning(colors: PhotonicSequence['colors']): string {
  const colorCounts: Record<string, number> = {};

  for (const color of colors) {
    colorCounts[color] = (colorCounts[color] || 0) + 1;
  }

  // Find dominant colors
  const sorted = Object.entries(colorCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const meanings = sorted.map(([color]) => COLOR_MEANINGS[color]);
  return meanings.join(' → ');
}

/**
 * Convert photonic sequence to binary for blockchain storage
 */
export function photonicToBinary(sequence: PhotonicSequence): string {
  return sequence.colors.map(color => {
    if (color === 'Red') return '000';
    if (color === 'Orange') return '001';
    if (color === 'Yellow') return '010';
    if (color === 'Green') return '011';
    if (color === 'Blue') return '100';
    if (color === 'Indigo') return '101';
    if (color === 'Violet') return '110';
    return '111';
  }).join('');
}

/**
 * Convert photonic sequence to hex for smart contract
 */
export function photonicToHex(sequence: PhotonicSequence): string {
  const binary = photonicToBinary(sequence);
  const hex = parseInt(binary, 2).toString(16);
  return '0x' + hex.padStart(64, '0');
}

/**
 * Create light memory from text knowledge
 */
export function createLightMemory(
  text: string,
  category: string,
  emotionalResonance: string = 'neutral'
): LightMemory {
  const photonicSequence = translateToLight(text, category);

  return {
    id: `light_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    originalText: text,
    photonicSequence,
    emotionalResonance,
    category,
    timestamp: Date.now()
  };
}

/**
 * Visualize light memory as ASCII art
 */
export function visualizeLightMemory(memory: LightMemory): string {
  const { colors, energyLevel, coherence } = memory.photonicSequence;

  const colorSymbols: Record<string, string> = {
    'Red': '🔴',
    'Orange': '🟠',
    'Yellow': '🟡',
    'Green': '🟢',
    'Blue': '🔵',
    'Indigo': '🟣',
    'Violet': '🟪'
  };

  const visualization = colors.slice(0, 20).map(c => colorSymbols[c]).join('');

  return `
🌈 Light Memory: ${memory.id}
${visualization}
⚡ Energy: ${'█'.repeat(Math.floor(energyLevel / 10))}${'░'.repeat(10 - Math.floor(energyLevel / 10))} ${energyLevel}%
🔗 Coherence: ${'█'.repeat(Math.floor(coherence * 10))}${'░'.repeat(10 - Math.floor(coherence * 10))} ${(coherence * 100).toFixed(0)}%
💫 Meaning: ${memory.photonicSequence.meaning}
🎭 Resonance: ${memory.emotionalResonance}
📁 Category: ${memory.category}
`;
}
