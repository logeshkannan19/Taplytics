/**
 * Paragraph bank organized by difficulty.
 * Easy:   short sentences, common words, casual prose
 * Medium: moderate vocabulary, varied sentence structure
 * Hard:   technical/academic vocabulary, complex syntax
 */

export const PARAGRAPHS = {
  easy: [
    "The sun rose slowly over the hills, casting a warm golden light across the quiet valley below. Birds began to sing their morning songs, and the air was fresh and cool. It was the kind of morning that made you glad to be alive.",
    "She walked along the beach, letting the waves wash over her feet. The sand was soft and warm, and the sky was a brilliant blue. In the distance, a sailboat drifted peacefully across the horizon.",
    "He opened the old book carefully and began to read. The pages were yellow with age, but the words were still clear. It was a story he had heard before, but it never failed to capture his imagination.",
    "The market was full of color and noise. Vendors called out their prices while customers moved from stall to stall. The smell of fresh bread and ripe fruit filled the air on that bright summer day.",
    "They sat around the fire, sharing stories from their travels. The flames crackled and danced while stars filled the dark sky above. It was one of those rare nights that no one wanted to end.",
    "The small cat sat on the warm windowsill watching the birds outside. It flicked its tail slowly and let out a quiet purr. The afternoon light fell softly across the room, and everything felt peaceful.",
    "Rain began to fall just as they reached the shelter of the old oak tree. They laughed, shaking water from their hair and waiting for the clouds to pass. It was an unexpected detour that turned into a memory.",
  ],
  medium: [
    "Technology has fundamentally transformed the way we communicate, work, and understand the world around us. What once required weeks of correspondence can now be accomplished in seconds, bridging distances that once felt impossible to overcome.",
    "The concept of minimalism extends far beyond aesthetics — it represents a deliberate philosophy of removing the unnecessary to make room for what truly matters. Practitioners find that owning fewer things creates unexpected mental clarity.",
    "Scientists studying deep ocean trenches have discovered ecosystems that thrive without sunlight, sustained entirely by chemical energy from hydrothermal vents. These resilient creatures challenge our assumptions about what conditions life requires.",
    "Urban architecture reflects the values of the society that builds it. Cities that prioritize pedestrians and public spaces tend to foster stronger community bonds, while car-centric designs often lead to isolation and disconnection.",
    "The psychology of habit formation reveals that motivation is far less reliable than systems. By designing environments that make good behaviors effortless and poor ones inconvenient, we dramatically increase the likelihood of lasting change.",
    "Throughout history, great social movements have succeeded not by converting opponents, but by mobilizing those who already agreed but had not yet acted. The challenge was never persuasion — it was activation.",
    "Compounding applies to more than money. Skills, knowledge, relationships, and reputation all grow through consistent small investments over time. The difficulty is that early progress feels invisible, making it tempting to abandon the process.",
  ],
  hard: [
    "Quantum entanglement, often described as spooky action at a distance, challenges our classical intuitions about locality and causality. When two particles become entangled, measuring the quantum state of one instantaneously determines the correlated state of the other, regardless of the physical separation between them.",
    "The epistemological implications of Gödel's incompleteness theorems extend well beyond mathematics, suggesting that within any sufficiently complex formal system, there exist statements that are true but fundamentally unprovable using the axioms of that system alone.",
    "Neuroplasticity — the brain's remarkable ability to reorganize synaptic connections throughout life — has revolutionized our understanding of learning, recovery from injury, and the long-term consequences of chronic stress on cognitive architecture.",
    "The emergence of large language models has reignited philosophical debates about cognition, intentionality, and the nature of understanding. Critics argue that statistical pattern recognition, however sophisticated, is categorically distinct from genuine semantic comprehension.",
    "Thermodynamic entropy, colloquially described as disorder, is more precisely understood as the number of microscopic configurations consistent with a macroscopic observation — a definition that illuminates its deep connection to information theory and probability.",
    "The arbitrage pricing theory posits that asset returns can be modeled as linear functions of macroeconomic factors, with idiosyncratic risk eliminated through diversification. This framework generalizes the capital asset pricing model by allowing multiple sources of systematic risk.",
    "Epigenetic modifications — heritable changes in gene expression that do not involve alterations to the underlying DNA sequence — are increasingly implicated in the transgenerational transmission of acquired traits, challenging the strict boundaries of classical Mendelian inheritance.",
  ],
};

/**
 * Returns a random paragraph for the given difficulty.
 * @param {'easy'|'medium'|'hard'} difficulty
 * @returns {string}
 */
export function getRandomParagraph(difficulty = 'easy') {
  const pool = PARAGRAPHS[difficulty] ?? PARAGRAPHS.easy;
  return pool[Math.floor(Math.random() * pool.length)];
}
