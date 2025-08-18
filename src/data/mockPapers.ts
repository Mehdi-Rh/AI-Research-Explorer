import type { MockPaper } from '../types/paper';

export const mockPapers: MockPaper[] = [
  // AI/ML - Transformer Networks
  {
    id: '1',
    title: 'Attention is All You Need: Revolutionizing Neural Architectures',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit'],
    abstract:
      'We propose the Transformer, a novel neural network architecture based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. This model achieves state-of-the-art results on machine translation tasks while being more parallelizable and requiring significantly less time to train.',
    year: 2017,
    topics: ['transformer networks', 'attention mechanism', 'neural networks', 'sequence modeling'],
    paperType: 'conference',
    publicationVenue: 'NeurIPS',
    citations: 85420,
    pdfUrl: 'https://example.com/papers/attention-is-all-you-need.pdf',
  },
  // AI/ML - Computer Vision
  {
    id: '2',
    title: 'Vision Transformer: An Image is Worth 16x16 Words',
    authors: ['Alexey Dosovitskiy', 'Lucas Beyer', 'Alexander Kolesnikov', 'Dirk Weissenborn'],
    abstract:
      'While the Transformer architecture has become the de-facto standard for natural language processing tasks, its applications to computer vision remain limited. We show that a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks.',
    year: 2020,
    topics: ['computer vision', 'vision transformer', 'image classification', 'attention'],
    paperType: 'conference',
    publicationVenue: 'ICLR',
    citations: 42150,
    pdfUrl: 'https://example.com/papers/vision-transformer.pdf',
  },
  // AI/ML - NLP
  {
    id: '3',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee', 'Kristina Toutanova'],
    abstract:
      'We introduce BERT, which stands for Bidirectional Encoder Representations from Transformers. BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.',
    year: 2018,
    topics: ['natural language processing', 'BERT', 'bidirectional', 'pre-training'],
    paperType: 'conference',
    publicationVenue: 'NAACL-HLT',
    citations: 67890,
    pdfUrl: 'https://example.com/papers/bert.pdf',
  },
  // Medicine - Cancer Research
  {
    id: '4',
    title: 'AI-Driven Personalized Cancer Treatment: Genomic Analysis and Therapy Selection',
    authors: ['Dr. Sarah Chen', 'Prof. Michael Rodriguez', 'Dr. Emily Watson', 'Dr. James Kim'],
    abstract:
      'We present a comprehensive AI framework for personalized cancer treatment that analyzes genomic data to predict optimal therapy combinations. Our approach demonstrates a 35% improvement in patient survival rates across multiple cancer types through precision medicine.',
    year: 2023,
    topics: ['cancer research', 'personalized medicine', 'genomics', 'AI'],
    paperType: 'journal',
    publicationVenue: 'Nature Cancer',
    citations: 5630,
    pdfUrl: 'https://example.com/papers/personalized-cancer-treatment.pdf',
  },
  // Medicine - Drug Discovery
  {
    id: '5',
    title: 'Deep Learning Accelerated Drug Discovery: From Molecules to Clinical Trials',
    authors: ['Dr. Lisa Zhang', 'Prof. David Brown', 'Dr. Maria Garcia', 'Dr. Robert Johnson'],
    abstract:
      'We develop a deep learning pipeline that accelerates drug discovery by predicting molecular properties, drug-target interactions, and clinical outcomes. Our approach reduces drug development time by 40% and identifies promising compounds 10x faster than traditional methods.',
    year: 2022,
    topics: ['drug discovery', 'deep learning', 'molecular modeling', 'clinical trials'],
    paperType: 'journal',
    publicationVenue: 'Nature Drug Discovery',
    citations: 8920,
    pdfUrl: 'https://example.com/papers/ai-drug-discovery.pdf',
  },
  // Medicine - Medical Imaging
  {
    id: '6',
    title: 'Deep Learning for Early Cancer Detection in Medical Imaging',
    authors: ['Dr. Anna Kowalski', 'Prof. Thomas Anderson', 'Dr. Priya Patel', 'Dr. Ahmed Hassan'],
    abstract:
      'We present a deep learning framework for early cancer detection across multiple imaging modalities including CT, MRI, and X-ray. Our models achieve 97.2% accuracy in detecting early-stage cancers, significantly outperforming traditional radiological assessments.',
    year: 2023,
    topics: ['medical imaging', 'cancer detection', 'deep learning', 'radiology'],
    paperType: 'journal',
    publicationVenue: 'The Lancet Digital Health',
    citations: 4320,
    pdfUrl: 'https://example.com/papers/medical-imaging-cancer.pdf',
  },
  // Climate - Climate Change
  {
    id: '7',
    title: 'Global Climate Modeling Using Machine Learning: Predicting the Next Century',
    authors: ['Dr. Rachel Green', 'Prof. Wei Liu', 'Dr. Carlos Martinez', 'Dr. Fatima Al-Rashid'],
    abstract:
      'We develop machine learning models that integrate satellite data, ocean measurements, and atmospheric composition to predict climate changes over the next century. Our ensemble approach achieves unprecedented accuracy in temperature and precipitation forecasting.',
    year: 2022,
    topics: ['climate change', 'machine learning', 'climate modeling', 'prediction'],
    paperType: 'journal',
    publicationVenue: 'Nature Climate Change',
    citations: 6420,
    pdfUrl: 'https://example.com/papers/climate-change-prediction.pdf',
  },
  // Climate - Renewable Energy
  {
    id: '8',
    title: 'AI-Optimized Solar and Wind Energy Systems for Smart Grid Integration',
    authors: ['Dr. Alex Kumar', 'Prof. Elena Volkov', 'Dr. Mohammed Al-Zahra', 'Dr. Jennifer Lee'],
    abstract:
      'We present AI algorithms that optimize renewable energy generation and distribution for smart grid systems. Our approach reduces energy waste by 34% and improves grid stability while maximizing solar and wind energy utilization.',
    year: 2023,
    topics: ['renewable energy', 'smart grid', 'AI optimization', 'solar wind'],
    paperType: 'conference',
    publicationVenue: 'International Conference on Smart Grid Technology',
    citations: 3210,
    pdfUrl: 'https://example.com/papers/renewable-energy-ai.pdf',
  },
  // Climate - Sustainability
  {
    id: '9',
    title: 'Sustainable Manufacturing Through AI-Driven Carbon Footprint Optimization',
    authors: [
      'Dr. Green Tech',
      'Prof. Sustainability Expert',
      'Dr. Carbon Analyst',
      'Dr. Eco Engineer',
    ],
    abstract:
      'We develop AI systems that optimize manufacturing processes to minimize carbon footprint while maintaining production efficiency. Our framework reduces industrial emissions by 45% across multiple sectors through intelligent resource allocation.',
    year: 2022,
    topics: ['sustainability', 'carbon footprint', 'manufacturing', 'AI optimization'],
    paperType: 'journal',
    publicationVenue: 'Journal of Cleaner Production',
    citations: 2890,
    pdfUrl: 'https://example.com/papers/sustainable-manufacturing.pdf',
  },
  // Technology - Quantum Computing
  {
    id: '10',
    title: 'Quantum Machine Learning: Algorithms for the NISQ Era',
    authors: [
      'Dr. Quantum Chen',
      'Prof. Alice Cipher',
      'Dr. Bob Entanglement',
      'Dr. Eve Measurement',
    ],
    abstract:
      'We present quantum machine learning algorithms optimized for Noisy Intermediate-Scale Quantum (NISQ) devices. Our variational quantum algorithms demonstrate quantum advantage for specific machine learning tasks while being robust to quantum noise.',
    year: 2022,
    topics: ['quantum computing', 'quantum machine learning', 'NISQ', 'quantum algorithms'],
    paperType: 'journal',
    publicationVenue: 'Nature Quantum Information',
    citations: 3890,
    pdfUrl: 'https://example.com/papers/quantum-ml.pdf',
  },
  // Technology - Blockchain
  {
    id: '11',
    title: 'Scalable Blockchain Architecture for Enterprise Applications',
    authors: [
      'Dr. Chain Block',
      'Prof. Distributed Systems',
      'Dr. Consensus Expert',
      'Dr. Crypto Engineer',
    ],
    abstract:
      'We propose a novel blockchain architecture that achieves enterprise-scale performance with 100,000+ transactions per second while maintaining decentralization and security. Our sharding and consensus mechanisms enable real-world blockchain adoption.',
    year: 2023,
    topics: ['blockchain', 'scalability', 'enterprise', 'distributed systems'],
    paperType: 'conference',
    publicationVenue: 'IEEE Blockchain Conference',
    citations: 2150,
    pdfUrl: 'https://example.com/papers/scalable-blockchain.pdf',
  },
  // Technology - Cybersecurity
  {
    id: '12',
    title: 'AI-Powered Zero-Day Exploit Detection in Real-Time Networks',
    authors: ['Dr. Cyber Guard', 'Prof. Security AI', 'Dr. Threat Hunter', 'Dr. Network Defense'],
    abstract:
      'We develop AI models that detect zero-day exploits and advanced persistent threats in real-time by analyzing network behavior patterns. Our system identifies 98% of novel attacks within minutes while maintaining low false positive rates.',
    year: 2023,
    topics: ['cybersecurity', 'zero-day exploits', 'threat detection', 'AI'],
    paperType: 'journal',
    publicationVenue: 'IEEE Security & Privacy',
    citations: 4320,
    pdfUrl: 'https://example.com/papers/zero-day-detection.pdf',
  },
  // AI/ML - Transformer Networks
  {
    id: '13',
    title: 'Sparse Transformer Networks for Efficient Large-Scale Processing',
    authors: [
      'Dr. Efficient AI',
      'Prof. Sparse Model',
      'Dr. Optimization Expert',
      'Dr. Scale Tech',
    ],
    abstract:
      'We introduce sparse transformer networks that maintain performance while reducing computational complexity by 75%. Our approach enables training of billion-parameter models on standard hardware through adaptive sparsity patterns.',
    year: 2024,
    topics: ['transformer networks', 'sparse models', 'efficiency', 'large-scale'],
    paperType: 'conference',
    publicationVenue: 'ICML',
    citations: 2890,
    pdfUrl: 'https://example.com/papers/sparse-transformers.pdf',
  },
  // AI/ML - Computer Vision
  {
    id: '14',
    title: 'Self-Supervised Learning for 3D Object Recognition',
    authors: ['Dr. 3D Vision', 'Prof. Self-Supervised', 'Dr. Object Expert', 'Dr. Representation'],
    abstract:
      'We present a self-supervised learning framework for 3D object recognition that learns from unlabeled point cloud data. Our method achieves state-of-the-art performance on 3D object classification and segmentation tasks.',
    year: 2023,
    topics: ['computer vision', '3D recognition', 'self-supervised learning', 'point clouds'],
    paperType: 'journal',
    publicationVenue: 'IEEE PAMI',
    citations: 3450,
    pdfUrl: 'https://example.com/papers/3d-self-supervised.pdf',
  },
  // AI/ML - NLP
  {
    id: '15',
    title: 'Multimodal Language Models: Bridging Text and Visual Understanding',
    authors: ['Dr. Multimodal AI', 'Prof. Language Vision', 'Dr. Cross-Modal', 'Dr. Understanding'],
    abstract:
      'We develop multimodal language models that seamlessly integrate text and visual information for comprehensive understanding. Our architecture demonstrates superior performance on visual question answering and image captioning tasks.',
    year: 2024,
    topics: ['natural language processing', 'multimodal', 'vision-language', 'understanding'],
    paperType: 'conference',
    publicationVenue: 'ACL',
    citations: 4120,
    pdfUrl: 'https://example.com/papers/multimodal-language.pdf',
  },
  // Medicine - Cancer Research
  {
    id: '16',
    title: 'Liquid Biopsy Analysis Using AI for Early Cancer Screening',
    authors: [
      'Dr. Liquid Biopsy',
      'Prof. Early Detection',
      'Dr. Cancer Screen',
      'Dr. Biomarker AI',
    ],
    abstract:
      'We develop AI algorithms that analyze circulating tumor DNA from liquid biopsies to detect cancer at its earliest stages. Our approach identifies cancer biomarkers with 93% sensitivity across multiple cancer types.',
    year: 2023,
    topics: ['cancer research', 'liquid biopsy', 'early detection', 'biomarkers'],
    paperType: 'journal',
    publicationVenue: 'Nature Medicine',
    citations: 3890,
    pdfUrl: 'https://example.com/papers/liquid-biopsy-ai.pdf',
  },
  // Medicine - Drug Discovery
  {
    id: '17',
    title: 'AI-Driven Protein Folding Prediction for Drug Target Identification',
    authors: ['Dr. Protein Fold', 'Prof. Drug Target', 'Dr. Structure AI', 'Dr. Molecular Design'],
    abstract:
      'We leverage AI-driven protein folding predictions to identify novel drug targets and design therapeutic compounds. Our approach discovers 15 new drug targets for neurodegenerative diseases with validated binding affinities.',
    year: 2024,
    topics: ['drug discovery', 'protein folding', 'drug targets', 'molecular design'],
    paperType: 'journal',
    publicationVenue: 'Science',
    citations: 6540,
    pdfUrl: 'https://example.com/papers/protein-folding-drugs.pdf',
  },
  // Medicine - Medical Imaging
  {
    id: '18',
    title: 'Federated Learning for Multi-Center Medical Image Analysis',
    authors: [
      'Dr. Federated Med',
      'Prof. Multi-Center',
      'Dr. Privacy Health',
      'Dr. Collaborative AI',
    ],
    abstract:
      'We implement federated learning frameworks that enable multiple medical centers to collaboratively train AI models without sharing patient data. Our approach improves diagnostic accuracy while maintaining strict privacy standards.',
    year: 2023,
    topics: ['medical imaging', 'federated learning', 'privacy', 'multi-center'],
    paperType: 'journal',
    publicationVenue: 'Nature Digital Medicine',
    citations: 2760,
    pdfUrl: 'https://example.com/papers/federated-medical-imaging.pdf',
  },
  // Climate - Climate Change
  {
    id: '19',
    title: 'AI-Enhanced Climate Attribution Studies for Extreme Weather Events',
    authors: [
      'Dr. Climate Attribution',
      'Prof. Extreme Weather',
      'Dr. AI Climate',
      'Dr. Event Analysis',
    ],
    abstract:
      'We develop AI models that enhance climate attribution studies by accurately linking extreme weather events to climate change. Our framework provides rapid attribution analysis within days of weather events.',
    year: 2024,
    topics: ['climate change', 'extreme weather', 'attribution studies', 'AI analysis'],
    paperType: 'journal',
    publicationVenue: 'Nature Climate Change',
    citations: 3210,
    pdfUrl: 'https://example.com/papers/climate-attribution-ai.pdf',
  },
  // Climate - Renewable Energy
  {
    id: '20',
    title: 'Machine Learning for Optimal Placement of Offshore Wind Farms',
    authors: ['Dr. Offshore Wind', 'Prof. ML Energy', 'Dr. Wind Optimization', 'Dr. Marine Tech'],
    abstract:
      'We apply machine learning to optimize offshore wind farm placement considering wind patterns, marine ecosystems, and grid connectivity. Our models increase energy generation by 28% while minimizing environmental impact.',
    year: 2023,
    topics: ['renewable energy', 'offshore wind', 'optimization', 'machine learning'],
    paperType: 'conference',
    publicationVenue: 'Offshore Wind Technology Conference',
    citations: 1890,
    pdfUrl: 'https://example.com/papers/offshore-wind-ml.pdf',
  },
  // Climate - Sustainability
  {
    id: '21',
    title: 'Circular Economy Optimization Using AI for Waste Reduction',
    authors: [
      'Dr. Circular Economy',
      'Prof. Waste AI',
      'Dr. Sustainability Tech',
      'Dr. Resource Loop',
    ],
    abstract:
      'We develop AI systems that optimize circular economy processes to minimize waste and maximize resource reuse. Our framework reduces industrial waste by 60% through intelligent material flow optimization.',
    year: 2024,
    topics: ['sustainability', 'circular economy', 'waste reduction', 'resource optimization'],
    paperType: 'journal',
    publicationVenue: 'Resources, Conservation and Recycling',
    citations: 2340,
    pdfUrl: 'https://example.com/papers/circular-economy-ai.pdf',
  },
  // Technology - Quantum Computing
  {
    id: '22',
    title: 'Quantum Error Mitigation Techniques for Near-Term Quantum Devices',
    authors: [
      'Dr. Error Mitigation',
      'Prof. Quantum Control',
      'Dr. NISQ Expert',
      'Dr. Quantum Noise',
    ],
    abstract:
      'We develop novel quantum error mitigation techniques that improve the reliability of near-term quantum devices. Our methods reduce quantum noise by 85% enabling more accurate quantum computations.',
    year: 2024,
    topics: ['quantum computing', 'error mitigation', 'NISQ devices', 'quantum noise'],
    paperType: 'journal',
    publicationVenue: 'Physical Review X',
    citations: 2670,
    pdfUrl: 'https://example.com/papers/quantum-error-mitigation.pdf',
  },
  // Technology - Blockchain
  {
    id: '23',
    title: 'Interoperable Blockchain Networks for Cross-Chain Asset Transfer',
    authors: [
      'Dr. Interoperability',
      'Prof. Cross-Chain',
      'Dr. Blockchain Bridge',
      'Dr. Asset Transfer',
    ],
    abstract:
      'We design interoperable blockchain protocols that enable seamless asset transfer across different blockchain networks. Our solution maintains security while achieving sub-second cross-chain transactions.',
    year: 2023,
    topics: ['blockchain', 'interoperability', 'cross-chain', 'asset transfer'],
    paperType: 'conference',
    publicationVenue: 'Financial Cryptography and Data Security',
    citations: 1560,
    pdfUrl: 'https://example.com/papers/interoperable-blockchain.pdf',
  },
  // Technology - Cybersecurity
  {
    id: '24',
    title: 'Behavioral Biometrics for Continuous User Authentication',
    authors: [
      'Dr. Biometric Security',
      'Prof. User Behavior',
      'Dr. Continuous Auth',
      'Dr. Pattern Recognition',
    ],
    abstract:
      'We develop behavioral biometric systems that continuously authenticate users based on typing patterns, mouse movements, and interaction behaviors. Our system achieves 99.2% accuracy while being transparent to users.',
    year: 2024,
    topics: ['cybersecurity', 'behavioral biometrics', 'authentication', 'user behavior'],
    paperType: 'journal',
    publicationVenue: 'IEEE Transactions on Information Forensics and Security',
    citations: 1780,
    pdfUrl: 'https://example.com/papers/behavioral-biometrics.pdf',
  },
  // AI/ML - Transformer Networks
  {
    id: '25',
    title: 'Dynamic Transformer Architectures with Adaptive Layer Selection',
    authors: ['Dr. Dynamic Net', 'Prof. Adaptive AI', 'Dr. Layer Expert', 'Dr. Efficiency Master'],
    abstract:
      'We propose dynamic transformer architectures that adaptively select layers during inference based on input complexity. Our approach reduces computational cost by 60% while maintaining accuracy across diverse tasks.',
    year: 2024,
    topics: ['transformer networks', 'dynamic architecture', 'adaptive inference', 'efficiency'],
    paperType: 'conference',
    publicationVenue: 'ICLR',
    citations: 1980,
    pdfUrl: 'https://example.com/papers/dynamic-transformers.pdf',
  },
  // AI/ML - Computer Vision
  {
    id: '26',
    title: 'Neural Radiance Fields for Real-Time 3D Scene Reconstruction',
    authors: ['Dr. NeRF Expert', 'Prof. 3D Scene', 'Dr. Real-Time Vision', 'Dr. Radiance Field'],
    abstract:
      'We advance neural radiance fields (NeRF) for real-time 3D scene reconstruction from sparse camera views. Our optimized approach enables high-quality 3D rendering at 30 FPS on mobile devices.',
    year: 2023,
    topics: ['computer vision', 'neural radiance fields', '3D reconstruction', 'real-time'],
    paperType: 'journal',
    publicationVenue: 'Computer Graphics Forum',
    citations: 2450,
    pdfUrl: 'https://example.com/papers/realtime-nerf.pdf',
  },
  // AI/ML - NLP
  {
    id: '27',
    title: 'Few-Shot Learning for Low-Resource Language Translation',
    authors: [
      'Dr. Few-Shot NLP',
      'Prof. Low-Resource',
      'Dr. Translation Expert',
      'Dr. Multilingual AI',
    ],
    abstract:
      'We develop few-shot learning techniques for neural machine translation in low-resource languages. Our method achieves competitive translation quality using only 100 parallel sentences for training.',
    year: 2023,
    topics: [
      'natural language processing',
      'few-shot learning',
      'low-resource languages',
      'translation',
    ],
    paperType: 'conference',
    publicationVenue: 'EMNLP',
    citations: 1670,
    pdfUrl: 'https://example.com/papers/few-shot-translation.pdf',
  },
  // Medicine - Cancer Research
  {
    id: '28',
    title: 'Immunotherapy Response Prediction Using Single-Cell RNA Sequencing',
    authors: ['Dr. Immuno AI', 'Prof. Single-Cell', 'Dr. RNA Seq Expert', 'Dr. Cancer Immunology'],
    abstract:
      'We utilize single-cell RNA sequencing data and machine learning to predict patient response to immunotherapy. Our model identifies biomarkers that predict treatment success with 87% accuracy.',
    year: 2024,
    topics: ['cancer research', 'immunotherapy', 'single-cell sequencing', 'biomarkers'],
    paperType: 'journal',
    publicationVenue: 'Cell',
    citations: 4230,
    pdfUrl: 'https://example.com/papers/immunotherapy-prediction.pdf',
  },
  // Medicine - Drug Discovery
  {
    id: '29',
    title: 'Generative AI for Novel Antibiotic Discovery Against Resistant Bacteria',
    authors: [
      'Dr. Antibiotic AI',
      'Prof. Drug Generation',
      'Dr. Resistance Fighter',
      'Dr. Microbiology',
    ],
    abstract:
      'We employ generative AI models to design novel antibiotics effective against drug-resistant bacteria. Our approach discovers compounds with novel mechanisms of action against MRSA and other superbugs.',
    year: 2024,
    topics: ['drug discovery', 'generative AI', 'antibiotics', 'drug resistance'],
    paperType: 'journal',
    publicationVenue: 'Nature Biotechnology',
    citations: 3560,
    pdfUrl: 'https://example.com/papers/ai-antibiotic-discovery.pdf',
  },
  // Medicine - Medical Imaging
  {
    id: '30',
    title: 'AI-Assisted Surgical Navigation Using Real-Time Image Segmentation',
    authors: [
      'Dr. Surgical AI',
      'Prof. Image Guidance',
      'Dr. Surgery Tech',
      'Dr. Navigation Expert',
    ],
    abstract:
      'We develop AI-assisted surgical navigation systems that provide real-time image segmentation during operations. Our system improves surgical precision by 45% and reduces operation time by 20%.',
    year: 2023,
    topics: ['medical imaging', 'surgical navigation', 'real-time segmentation', 'surgery'],
    paperType: 'journal',
    publicationVenue: 'Journal of Medical Robotics Research',
    citations: 1890,
    pdfUrl: 'https://example.com/papers/ai-surgical-navigation.pdf',
  },
  // Climate - Climate Change
  {
    id: '31',
    title: 'Deep Learning for Arctic Sea Ice Prediction and Climate Impact Assessment',
    authors: ['Dr. Arctic AI', 'Prof. Sea Ice', 'Dr. Climate Prediction', 'Dr. Polar Research'],
    abstract:
      'We develop deep learning models for predicting Arctic sea ice extent and assessing its impact on global climate patterns. Our models provide accurate seasonal forecasts crucial for climate policy decisions.',
    year: 2023,
    topics: ['climate change', 'Arctic sea ice', 'deep learning', 'climate prediction'],
    paperType: 'journal',
    publicationVenue: 'The Cryosphere',
    citations: 2340,
    pdfUrl: 'https://example.com/papers/arctic-sea-ice-ai.pdf',
  },
  // Climate - Renewable Energy
  {
    id: '32',
    title: 'AI-Optimized Energy Storage Systems for Grid-Scale Renewable Integration',
    authors: [
      'Dr. Energy Storage',
      'Prof. Grid Integration',
      'Dr. Battery AI',
      'Dr. Power Systems',
    ],
    abstract:
      'We optimize grid-scale energy storage systems using AI to maximize renewable energy integration. Our algorithms increase storage efficiency by 35% and reduce grid instability during peak demand.',
    year: 2024,
    topics: ['renewable energy', 'energy storage', 'grid integration', 'AI optimization'],
    paperType: 'conference',
    publicationVenue: 'IEEE Power & Energy Society General Meeting',
    citations: 1560,
    pdfUrl: 'https://example.com/papers/ai-energy-storage.pdf',
  },
  // Climate - Sustainability
  {
    id: '33',
    title: 'Machine Learning for Sustainable Urban Water Management Systems',
    authors: [
      'Dr. Water AI',
      'Prof. Urban Systems',
      'Dr. Sustainability Water',
      'Dr. Smart Cities',
    ],
    abstract:
      'We implement machine learning solutions for sustainable urban water management that optimize water distribution and reduce waste. Our system decreases water loss by 40% in smart city deployments.',
    year: 2023,
    topics: ['sustainability', 'water management', 'urban systems', 'smart cities'],
    paperType: 'journal',
    publicationVenue: 'Water Research',
    citations: 1780,
    pdfUrl: 'https://example.com/papers/sustainable-water-management.pdf',
  },
  // Technology - Quantum Computing
  {
    id: '34',
    title: 'Variational Quantum Eigensolvers for Quantum Chemistry Applications',
    authors: [
      'Dr. Quantum Chemistry',
      'Prof. VQE Expert',
      'Dr. Molecular Simulation',
      'Dr. Quantum Algorithms',
    ],
    abstract:
      'We develop variational quantum eigensolvers (VQE) for quantum chemistry applications that accurately simulate molecular systems. Our approach enables quantum advantage for drug discovery and materials science.',
    year: 2023,
    topics: ['quantum computing', 'quantum chemistry', 'VQE', 'molecular simulation'],
    paperType: 'journal',
    publicationVenue: 'Journal of Chemical Theory and Computation',
    citations: 2190,
    pdfUrl: 'https://example.com/papers/vqe-quantum-chemistry.pdf',
  },
  // Technology - Blockchain
  {
    id: '35',
    title: 'Zero-Knowledge Proofs for Privacy-Preserving Blockchain Transactions',
    authors: [
      'Dr. Zero Knowledge',
      'Prof. Privacy Blockchain',
      'Dr. Cryptographic Proof',
      'Dr. Private Transactions',
    ],
    abstract:
      'We implement zero-knowledge proof systems that enable privacy-preserving transactions on public blockchains. Our protocol maintains transaction privacy while ensuring network security and auditability.',
    year: 2024,
    topics: ['blockchain', 'zero-knowledge proofs', 'privacy', 'cryptography'],
    paperType: 'conference',
    publicationVenue: 'Crypto',
    citations: 1340,
    pdfUrl: 'https://example.com/papers/zk-privacy-blockchain.pdf',
  },
  // Technology - Cybersecurity
  {
    id: '36',
    title: 'Adversarial Machine Learning Defense Mechanisms for Critical Infrastructure',
    authors: [
      'Dr. Adversarial Defense',
      'Prof. Critical Infra',
      'Dr. ML Security',
      'Dr. Infrastructure Protection',
    ],
    abstract:
      'We develop defense mechanisms against adversarial attacks on machine learning systems protecting critical infrastructure. Our approach detects and mitigates attacks with 96% success rate across power grids and transportation systems.',
    year: 2024,
    topics: ['cybersecurity', 'adversarial ML', 'critical infrastructure', 'defense mechanisms'],
    paperType: 'journal',
    publicationVenue: 'IEEE Transactions on Dependable and Secure Computing',
    citations: 2890,
    pdfUrl: 'https://example.com/papers/adversarial-defense-infrastructure.pdf',
  },
  // AI/ML - Transformer Networks
  {
    id: '37',
    title: 'Mixture of Experts Transformers for Massive Scale Language Processing',
    authors: [
      'Dr. MoE Expert',
      'Prof. Scale AI',
      'Dr. Distributed Computing',
      'Dr. Language Scale',
    ],
    abstract:
      'We present Mixture of Experts (MoE) transformer architectures that scale to trillion-parameter models while maintaining computational efficiency. Our approach enables training of ultra-large language models with sparse activation patterns.',
    year: 2024,
    topics: ['transformer networks', 'mixture of experts', 'large language models', 'scalability'],
    paperType: 'conference',
    publicationVenue: 'NeurIPS',
    citations: 3420,
    pdfUrl: 'https://example.com/papers/moe-transformers.pdf',
  },
  // AI/ML - Computer Vision
  {
    id: '38',
    title: 'Diffusion Models for High-Resolution Image Synthesis and Editing',
    authors: [
      'Dr. Diffusion AI',
      'Prof. Image Generation',
      'Dr. Synthesis Expert',
      'Dr. Creative AI',
    ],
    abstract:
      'We develop advanced diffusion models for high-resolution image synthesis and semantic editing. Our approach generates photorealistic images at 4K resolution with precise control over content and style.',
    year: 2023,
    topics: ['computer vision', 'diffusion models', 'image synthesis', 'generative AI'],
    paperType: 'journal',
    publicationVenue: 'IEEE PAMI',
    citations: 5670,
    pdfUrl: 'https://example.com/papers/diffusion-image-synthesis.pdf',
  },
  // AI/ML - NLP
  {
    id: '39',
    title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
    authors: [
      'Dr. RAG Expert',
      'Prof. Knowledge AI',
      'Dr. Retrieval Systems',
      'Dr. Information Access',
    ],
    abstract:
      'We present retrieval-augmented generation (RAG) systems that combine parametric and non-parametric knowledge for improved performance on knowledge-intensive NLP tasks. Our approach achieves state-of-the-art results on open-domain QA.',
    year: 2024,
    topics: [
      'natural language processing',
      'retrieval augmented generation',
      'knowledge systems',
      'question answering',
    ],
    paperType: 'conference',
    publicationVenue: 'EMNLP',
    citations: 2890,
    pdfUrl: 'https://example.com/papers/rag-knowledge-nlp.pdf',
  },
  // Medicine - Cancer Research
  {
    id: '40',
    title: 'Spatial Transcriptomics for Tumor Microenvironment Analysis and Therapy Prediction',
    authors: [
      'Dr. Spatial Genomics',
      'Prof. Tumor Biology',
      'Dr. Microenvironment',
      'Dr. Precision Oncology',
    ],
    abstract:
      'We leverage spatial transcriptomics and AI to analyze tumor microenvironments and predict therapeutic responses. Our approach maps cellular interactions within tumors to guide personalized treatment strategies.',
    year: 2024,
    topics: [
      'cancer research',
      'spatial transcriptomics',
      'tumor microenvironment',
      'precision medicine',
    ],
    paperType: 'journal',
    publicationVenue: 'Nature Cancer',
    citations: 3780,
    pdfUrl: 'https://example.com/papers/spatial-transcriptomics-cancer.pdf',
  },
  // Medicine - Drug Discovery
  {
    id: '41',
    title: 'AI-Driven Virtual Screening for Rare Disease Drug Repurposing',
    authors: [
      'Dr. Virtual Screen',
      'Prof. Rare Disease',
      'Dr. Drug Repurposing',
      'Dr. Orphan Drugs',
    ],
    abstract:
      'We develop AI systems for virtual screening of existing drugs for rare disease applications. Our platform identifies potential therapies for orphan diseases 50x faster than traditional approaches.',
    year: 2023,
    topics: ['drug discovery', 'virtual screening', 'rare diseases', 'drug repurposing'],
    paperType: 'journal',
    publicationVenue: 'Nature Drug Discovery',
    citations: 2450,
    pdfUrl: 'https://example.com/papers/virtual-screening-rare-diseases.pdf',
  },
  // Medicine - Medical Imaging
  {
    id: '42',
    title: 'Multimodal Medical Image Fusion for Enhanced Diagnostic Accuracy',
    authors: [
      'Dr. Image Fusion',
      'Prof. Multimodal Imaging',
      'Dr. Diagnostic AI',
      'Dr. Clinical Vision',
    ],
    abstract:
      'We present multimodal medical image fusion techniques that combine CT, MRI, PET, and ultrasound data for enhanced diagnostic accuracy. Our approach improves disease detection rates by 25% across multiple conditions.',
    year: 2024,
    topics: ['medical imaging', 'multimodal fusion', 'diagnostic accuracy', 'medical AI'],
    paperType: 'journal',
    publicationVenue: 'Medical Image Analysis',
    citations: 2120,
    pdfUrl: 'https://example.com/papers/multimodal-medical-fusion.pdf',
  },
  // Climate - Climate Change
  {
    id: '43',
    title: 'AI-Powered Carbon Capture Optimization for Industrial Applications',
    authors: [
      'Dr. Carbon Capture',
      'Prof. Industrial AI',
      'Dr. Emissions Control',
      'Dr. Climate Tech',
    ],
    abstract:
      'We develop AI algorithms that optimize carbon capture and storage systems for industrial applications. Our approach increases CO2 capture efficiency by 40% while reducing operational costs.',
    year: 2024,
    topics: ['climate change', 'carbon capture', 'industrial AI', 'emissions reduction'],
    paperType: 'journal',
    publicationVenue: 'Environmental Science & Technology',
    citations: 2670,
    pdfUrl: 'https://example.com/papers/ai-carbon-capture.pdf',
  },
  // Climate - Renewable Energy
  {
    id: '44',
    title: 'Machine Learning for Predictive Maintenance of Solar Panel Arrays',
    authors: [
      'Dr. Solar Maintenance',
      'Prof. Predictive AI',
      'Dr. Renewable Tech',
      'Dr. Energy Systems',
    ],
    abstract:
      'We implement machine learning systems for predictive maintenance of large-scale solar installations. Our approach reduces maintenance costs by 30% and increases energy output through proactive fault detection.',
    year: 2023,
    topics: ['renewable energy', 'predictive maintenance', 'solar energy', 'machine learning'],
    paperType: 'conference',
    publicationVenue: 'Solar Power International Conference',
    citations: 1340,
    pdfUrl: 'https://example.com/papers/solar-predictive-maintenance.pdf',
  },
  // Climate - Sustainability
  {
    id: '45',
    title: 'AI-Optimized Supply Chain Networks for Carbon Neutral Operations',
    authors: [
      'Dr. Supply Chain AI',
      'Prof. Carbon Neutral',
      'Dr. Logistics Optimization',
      'Dr. Sustainable Operations',
    ],
    abstract:
      'We design AI systems that optimize global supply chain networks to achieve carbon neutral operations. Our framework reduces supply chain emissions by 55% while maintaining cost efficiency.',
    year: 2024,
    topics: ['sustainability', 'supply chain optimization', 'carbon neutral', 'logistics AI'],
    paperType: 'journal',
    publicationVenue: 'Transportation Research Part E',
    citations: 1890,
    pdfUrl: 'https://example.com/papers/carbon-neutral-supply-chain.pdf',
  },
  // Technology - Quantum Computing
  {
    id: '46',
    title: 'Quantum Advantage in Cryptographic Protocol Design and Analysis',
    authors: [
      'Dr. Quantum Crypto',
      'Prof. Protocol Design',
      'Dr. Quantum Security',
      'Dr. Cryptographic Analysis',
    ],
    abstract:
      'We demonstrate quantum advantage in designing and analyzing cryptographic protocols. Our quantum algorithms provide exponential speedups for certain cryptographic problems while maintaining security guarantees.',
    year: 2024,
    topics: [
      'quantum computing',
      'cryptographic protocols',
      'quantum advantage',
      'security analysis',
    ],
    paperType: 'journal',
    publicationVenue: 'Journal of Cryptology',
    citations: 1780,
    pdfUrl: 'https://example.com/papers/quantum-cryptographic-protocols.pdf',
  },
  // Technology - Blockchain
  {
    id: '47',
    title: 'Sustainable Blockchain Consensus Mechanisms for Energy-Efficient Networks',
    authors: [
      'Dr. Green Blockchain',
      'Prof. Consensus Energy',
      'Dr. Sustainable Crypto',
      'Dr. Energy Efficient',
    ],
    abstract:
      'We develop sustainable consensus mechanisms that reduce blockchain energy consumption by 99% compared to proof-of-work while maintaining security and decentralization properties.',
    year: 2023,
    topics: ['blockchain', 'sustainable consensus', 'energy efficiency', 'green technology'],
    paperType: 'conference',
    publicationVenue: 'Sustainable Computing Conference',
    citations: 2340,
    pdfUrl: 'https://example.com/papers/sustainable-blockchain-consensus.pdf',
  },
  // Technology - Cybersecurity
  {
    id: '48',
    title: 'Quantum-Safe Cryptography Implementation for Post-Quantum Security',
    authors: [
      'Dr. Post-Quantum',
      'Prof. Quantum Safe',
      'Dr. Future Crypto',
      'Dr. Security Evolution',
    ],
    abstract:
      'We implement quantum-safe cryptographic systems that protect against future quantum computer attacks. Our protocols ensure long-term security in the post-quantum era while maintaining practical performance.',
    year: 2024,
    topics: [
      'cybersecurity',
      'post-quantum cryptography',
      'quantum-safe security',
      'future-proof encryption',
    ],
    paperType: 'journal',
    publicationVenue: 'ACM Computing Surveys',
    citations: 3120,
    pdfUrl: 'https://example.com/papers/quantum-safe-cryptography.pdf',
  },
  // AI/ML - Transformer Networks
  {
    id: '49',
    title: 'Efficient Transformer Training with Gradient Compression and Memory Optimization',
    authors: [
      'Dr. Efficient Training',
      'Prof. Memory Optimization',
      'Dr. Gradient Compression',
      'Dr. Resource Management',
    ],
    abstract:
      'We develop gradient compression and memory optimization techniques for efficient transformer training. Our approach reduces memory usage by 70% and training time by 50% while maintaining model performance.',
    year: 2024,
    topics: [
      'transformer networks',
      'training efficiency',
      'gradient compression',
      'memory optimization',
    ],
    paperType: 'conference',
    publicationVenue: 'ICML',
    citations: 2340,
    pdfUrl: 'https://example.com/papers/efficient-transformer-training.pdf',
  },
  // AI/ML - Computer Vision
  {
    id: '50',
    title: 'Foundation Models for Medical Computer Vision Across Multiple Domains',
    authors: [
      'Dr. Foundation Vision',
      'Prof. Medical AI',
      'Dr. Multi-Domain',
      'Dr. Visual Foundation',
    ],
    abstract:
      'We present foundation models for medical computer vision that generalize across multiple medical imaging domains. Our unified architecture achieves state-of-the-art performance on radiology, pathology, and dermatology tasks.',
    year: 2024,
    topics: ['computer vision', 'foundation models', 'medical imaging', 'multi-domain'],
    paperType: 'journal',
    publicationVenue: 'Nature Machine Intelligence',
    citations: 4560,
    pdfUrl: 'https://example.com/papers/medical-foundation-models.pdf',
  },
  // AI/ML - NLP
  {
    id: '51',
    title: 'Code-Switching Language Models for Multilingual Conversational AI',
    authors: [
      'Dr. Code-Switch',
      'Prof. Multilingual AI',
      'Dr. Conversational',
      'Dr. Language Mixing',
    ],
    abstract:
      'We develop language models that handle code-switching in multilingual conversations. Our approach enables natural language processing for mixed-language scenarios common in global communications.',
    year: 2023,
    topics: ['natural language processing', 'code-switching', 'multilingual', 'conversational AI'],
    paperType: 'conference',
    publicationVenue: 'ACL',
    citations: 1890,
    pdfUrl: 'https://example.com/papers/code-switching-nlp.pdf',
  },
  // Medicine - Cancer Research
  {
    id: '52',
    title: 'AI-Powered Radiomics for Predicting Cancer Treatment Response',
    authors: [
      'Dr. Radiomics AI',
      'Prof. Treatment Response',
      'Dr. Quantitative Imaging',
      'Dr. Predictive Oncology',
    ],
    abstract:
      'We leverage AI-powered radiomics to predict cancer treatment response from medical imaging. Our model extracts quantitative features from CT and MRI scans to forecast therapy outcomes with 89% accuracy.',
    year: 2024,
    topics: ['cancer research', 'radiomics', 'treatment response', 'predictive modeling'],
    paperType: 'journal',
    publicationVenue: 'The Lancet Oncology',
    citations: 3450,
    pdfUrl: 'https://example.com/papers/radiomics-treatment-response.pdf',
  },
  // Medicine - Drug Discovery
  {
    id: '53',
    title: 'Quantum-Enhanced Molecular Simulation for Novel Drug Design',
    authors: [
      'Dr. Quantum Pharma',
      'Prof. Molecular Quantum',
      'Dr. Drug Simulation',
      'Dr. Quantum Chemistry',
    ],
    abstract:
      'We combine quantum computing with molecular simulation for novel drug design. Our quantum-enhanced approach accurately models complex molecular interactions to accelerate discovery of next-generation therapeutics.',
    year: 2024,
    topics: ['drug discovery', 'quantum computing', 'molecular simulation', 'drug design'],
    paperType: 'journal',
    publicationVenue: 'Journal of Chemical Information and Modeling',
    citations: 2780,
    pdfUrl: 'https://example.com/papers/quantum-drug-simulation.pdf',
  },
  // Medicine - Medical Imaging
  {
    id: '54',
    title: 'Real-Time AI-Assisted Ultrasound Guidance for Emergency Medicine',
    authors: [
      'Dr. Emergency Ultrasound',
      'Prof. Point-of-Care',
      'Dr. Real-Time AI',
      'Dr. Emergency Medicine',
    ],
    abstract:
      'We develop real-time AI systems that assist emergency physicians with ultrasound-guided procedures. Our approach provides automated organ detection and measurement guidance, improving diagnostic accuracy in critical care settings.',
    year: 2023,
    topics: ['medical imaging', 'emergency medicine', 'ultrasound guidance', 'point-of-care'],
    paperType: 'journal',
    publicationVenue: 'Academic Emergency Medicine',
    citations: 1560,
    pdfUrl: 'https://example.com/papers/emergency-ultrasound-ai.pdf',
  },
  // Climate - Climate Change
  {
    id: '55',
    title: 'Machine Learning for Early Warning Systems of Climate-Induced Natural Disasters',
    authors: [
      'Dr. Disaster AI',
      'Prof. Early Warning',
      'Dr. Climate Hazards',
      'Dr. Risk Prediction',
    ],
    abstract:
      'We develop machine learning systems for early warning of climate-induced natural disasters. Our models predict floods, droughts, and extreme weather events 7-14 days in advance with 85% accuracy.',
    year: 2023,
    topics: ['climate change', 'natural disasters', 'early warning systems', 'risk prediction'],
    paperType: 'journal',
    publicationVenue: 'Nature Climate Change',
    citations: 2890,
    pdfUrl: 'https://example.com/papers/climate-disaster-warning.pdf',
  },
  // Climate - Renewable Energy
  {
    id: '56',
    title: 'AI-Driven Microgrids for Resilient Renewable Energy Distribution',
    authors: [
      'Dr. Microgrid AI',
      'Prof. Energy Resilience',
      'Dr. Distributed Systems',
      'Dr. Smart Grid',
    ],
    abstract:
      'We design AI-driven microgrids that enhance resilience of renewable energy distribution. Our system automatically adapts to outages and demand fluctuations, maintaining 99.9% uptime for critical infrastructure.',
    year: 2024,
    topics: ['renewable energy', 'microgrids', 'energy resilience', 'distributed systems'],
    paperType: 'conference',
    publicationVenue: 'IEEE Smart Grid Communications',
    citations: 1780,
    pdfUrl: 'https://example.com/papers/ai-microgrids.pdf',
  },
  // Climate - Sustainability
  {
    id: '57',
    title: 'Digital Twins for Sustainable Smart City Planning and Management',
    authors: [
      'Dr. Digital Twin',
      'Prof. Smart Cities',
      'Dr. Urban Sustainability',
      'Dr. City Planning',
    ],
    abstract:
      'We create digital twin systems for sustainable smart city planning and management. Our platform simulates urban systems to optimize resource usage, reduce emissions, and improve quality of life for city residents.',
    year: 2024,
    topics: ['sustainability', 'digital twins', 'smart cities', 'urban planning'],
    paperType: 'journal',
    publicationVenue: 'Sustainable Cities and Society',
    citations: 2120,
    pdfUrl: 'https://example.com/papers/digital-twin-cities.pdf',
  },
  // Technology - Quantum Computing
  {
    id: '58',
    title: 'Hybrid Quantum-Classical Algorithms for Large-Scale Optimization Problems',
    authors: [
      'Dr. Hybrid Quantum',
      'Prof. Quantum Optimization',
      'Dr. Classical-Quantum',
      'Dr. Algorithm Design',
    ],
    abstract:
      'We develop hybrid quantum-classical algorithms for solving large-scale optimization problems. Our approach combines the strengths of quantum and classical computing to achieve exponential speedups for NP-hard problems.',
    year: 2024,
    topics: [
      'quantum computing',
      'hybrid algorithms',
      'optimization',
      'quantum-classical computing',
    ],
    paperType: 'journal',
    publicationVenue: 'Quantum Science and Technology',
    citations: 2450,
    pdfUrl: 'https://example.com/papers/hybrid-quantum-optimization.pdf',
  },
  // Technology - Blockchain
  {
    id: '59',
    title: 'Decentralized Identity Management Using Blockchain and Zero-Knowledge Proofs',
    authors: [
      'Dr. Decentralized ID',
      'Prof. Identity Blockchain',
      'Dr. Self-Sovereign',
      'Dr. Privacy Identity',
    ],
    abstract:
      'We implement decentralized identity management systems using blockchain and zero-knowledge proofs. Our solution enables self-sovereign identity while protecting user privacy and ensuring verifiable credentials.',
    year: 2024,
    topics: ['blockchain', 'decentralized identity', 'zero-knowledge proofs', 'privacy'],
    paperType: 'conference',
    publicationVenue: 'Identity and Privacy in the Digital Age',
    citations: 1670,
    pdfUrl: 'https://example.com/papers/decentralized-identity-blockchain.pdf',
  },
  // Technology - Cybersecurity
  {
    id: '60',
    title: 'AI-Powered Threat Intelligence for Proactive Cybersecurity Defense',
    authors: [
      'Dr. Threat Intelligence',
      'Prof. Proactive Security',
      'Dr. AI Defense',
      'Dr. Cyber Analytics',
    ],
    abstract:
      'We develop AI-powered threat intelligence systems for proactive cybersecurity defense. Our platform analyzes global threat patterns to predict and prevent cyber attacks before they occur, reducing breach incidents by 80%.',
    year: 2024,
    topics: ['cybersecurity', 'threat intelligence', 'proactive defense', 'AI security'],
    paperType: 'journal',
    publicationVenue: 'Computers & Security',
    citations: 2340,
    pdfUrl: 'https://example.com/papers/ai-threat-intelligence.pdf',
  },
  // AI/ML - Transformer Networks
  {
    id: '61',
    title: 'Federated Transformer Learning for Privacy-Preserving Large Language Models',
    authors: [
      'Dr. Federated AI',
      'Prof. Privacy ML',
      'Dr. Distributed Learning',
      'Dr. Secure Training',
    ],
    abstract:
      'We present federated learning frameworks for training large transformer models while preserving data privacy. Our approach enables collaborative training across institutions without data sharing, maintaining model performance while ensuring privacy.',
    year: 2024,
    topics: [
      'transformer networks',
      'federated learning',
      'privacy preservation',
      'distributed training',
    ],
    paperType: 'conference',
    publicationVenue: 'FedML Workshop at NeurIPS',
    citations: 1890,
    pdfUrl: 'https://example.com/papers/federated-transformer-learning.pdf',
  },
  // AI/ML - Computer Vision
  {
    id: '62',
    title: 'Adversarial Robustness in Vision Transformers for Safety-Critical Applications',
    authors: [
      'Dr. Robust Vision',
      'Prof. Safety AI',
      'Dr. Adversarial Defense',
      'Dr. Critical Systems',
    ],
    abstract:
      'We enhance adversarial robustness in vision transformers for deployment in safety-critical applications. Our defense mechanisms ensure reliable performance under adversarial attacks, crucial for autonomous vehicles and medical diagnostics.',
    year: 2023,
    topics: ['computer vision', 'adversarial robustness', 'safety-critical', 'vision transformers'],
    paperType: 'journal',
    publicationVenue: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
    citations: 2670,
    pdfUrl: 'https://example.com/papers/robust-vision-transformers.pdf',
  },
  // AI/ML - NLP
  {
    id: '63',
    title: 'Constitutional AI for Responsible Language Model Alignment',
    authors: [
      'Dr. Constitutional AI',
      'Prof. AI Safety',
      'Dr. Model Alignment',
      'Dr. Responsible AI',
    ],
    abstract:
      'We develop constitutional AI methods for aligning large language models with human values and ethical principles. Our approach trains models to be helpful, harmless, and honest through constitutional training procedures.',
    year: 2024,
    topics: ['natural language processing', 'constitutional AI', 'AI alignment', 'responsible AI'],
    paperType: 'journal',
    publicationVenue: 'AI Ethics and Society',
    citations: 3120,
    pdfUrl: 'https://example.com/papers/constitutional-ai-alignment.pdf',
  },
  // Medicine - Cancer Research
  {
    id: '64',
    title: 'Multi-Omics Integration for Comprehensive Cancer Subtype Classification',
    authors: [
      'Dr. Multi-Omics',
      'Prof. Cancer Genomics',
      'Dr. Systems Biology',
      'Dr. Precision Oncology',
    ],
    abstract:
      'We integrate genomics, transcriptomics, proteomics, and metabolomics data using AI to identify novel cancer subtypes. Our multi-omics approach reveals previously unknown molecular signatures for personalized treatment strategies.',
    year: 2024,
    topics: ['cancer research', 'multi-omics', 'cancer subtypes', 'systems biology'],
    paperType: 'journal',
    publicationVenue: 'Nature Genetics',
    citations: 4230,
    pdfUrl: 'https://example.com/papers/multi-omics-cancer-subtypes.pdf',
  },
  // Medicine - Drug Discovery
  {
    id: '65',
    title: 'AI-Guided De Novo Drug Design Using Reinforcement Learning',
    authors: [
      'Dr. Drug Design AI',
      'Prof. Molecular RL',
      'Dr. Chemical Space',
      'Dr. Novel Therapeutics',
    ],
    abstract:
      'We employ reinforcement learning for de novo drug design, generating novel molecular structures with desired therapeutic properties. Our AI agent explores chemical space efficiently to discover promising drug candidates.',
    year: 2023,
    topics: ['drug discovery', 'reinforcement learning', 'de novo design', 'molecular generation'],
    paperType: 'journal',
    publicationVenue: 'Nature Chemistry',
    citations: 3890,
    pdfUrl: 'https://example.com/papers/rl-drug-design.pdf',
  },
  // Medicine - Medical Imaging
  {
    id: '66',
    title: 'Explainable AI for Medical Image Diagnosis with Clinical Decision Support',
    authors: [
      'Dr. Explainable Med',
      'Prof. Clinical AI',
      'Dr. Interpretable ML',
      'Dr. Medical Decision',
    ],
    abstract:
      'We develop explainable AI systems for medical image diagnosis that provide interpretable explanations to clinicians. Our approach generates visual attention maps and textual explanations to support clinical decision-making.',
    year: 2024,
    topics: ['medical imaging', 'explainable AI', 'clinical decision support', 'interpretability'],
    paperType: 'journal',
    publicationVenue: 'Nature Medicine',
    citations: 2890,
    pdfUrl: 'https://example.com/papers/explainable-medical-ai.pdf',
  },
  // Climate - Climate Change
  {
    id: '67',
    title: 'Satellite-Based AI for Real-Time Deforestation Monitoring and Prevention',
    authors: [
      'Dr. Satellite AI',
      'Prof. Forest Monitoring',
      'Dr. Deforestation Tech',
      'Dr. Environmental Remote Sensing',
    ],
    abstract:
      'We develop satellite-based AI systems for real-time deforestation monitoring and prevention. Our approach provides early warnings to authorities and enables rapid response to illegal logging activities.',
    year: 2023,
    topics: [
      'climate change',
      'deforestation monitoring',
      'satellite imagery',
      'environmental protection',
    ],
    paperType: 'journal',
    publicationVenue: 'Remote Sensing of Environment',
    citations: 2120,
    pdfUrl: 'https://example.com/papers/satellite-deforestation-ai.pdf',
  },
  // Climate - Renewable Energy
  {
    id: '68',
    title: 'AI-Enhanced Wave Energy Converters for Ocean Power Generation',
    authors: ['Dr. Wave Energy', 'Prof. Ocean Power', 'Dr. Marine Renewable', 'Dr. Blue Energy'],
    abstract:
      'We optimize wave energy converters using AI to maximize ocean power generation. Our adaptive control systems adjust to wave conditions in real-time, increasing energy capture efficiency by 45%.',
    year: 2024,
    topics: ['renewable energy', 'wave energy', 'ocean power', 'adaptive control'],
    paperType: 'conference',
    publicationVenue: 'Ocean Engineering and Marine Energy',
    citations: 1450,
    pdfUrl: 'https://example.com/papers/ai-wave-energy.pdf',
  },
  // Climate - Sustainability
  {
    id: '69',
    title: 'Blockchain-Based Carbon Credit Trading Platform with AI Verification',
    authors: [
      'Dr. Carbon Trading',
      'Prof. Blockchain Climate',
      'Dr. Emissions Verification',
      'Dr. Climate Finance',
    ],
    abstract:
      'We create blockchain-based carbon credit trading platforms with AI-powered verification systems. Our solution ensures transparency and prevents fraud in carbon markets while accelerating climate action financing.',
    year: 2024,
    topics: ['sustainability', 'carbon trading', 'blockchain verification', 'climate finance'],
    paperType: 'journal',
    publicationVenue: 'Environmental Research Letters',
    citations: 1780,
    pdfUrl: 'https://example.com/papers/blockchain-carbon-trading.pdf',
  },
  // Technology - Quantum Computing
  {
    id: '70',
    title: 'Quantum Network Protocols for Distributed Quantum Computing',
    authors: [
      'Dr. Quantum Networks',
      'Prof. Distributed Quantum',
      'Dr. Quantum Internet',
      'Dr. Quantum Communication',
    ],
    abstract:
      'We design quantum network protocols for distributed quantum computing across multiple quantum devices. Our approach enables large-scale quantum computations by connecting geographically distributed quantum processors.',
    year: 2024,
    topics: ['quantum computing', 'quantum networks', 'distributed computing', 'quantum internet'],
    paperType: 'journal',
    publicationVenue: 'Nature Quantum Information',
    citations: 2340,
    pdfUrl: 'https://example.com/papers/quantum-network-protocols.pdf',
  },
  // Technology - Blockchain
  {
    id: '71',
    title: 'Layer-2 Scaling Solutions for High-Throughput Blockchain Applications',
    authors: [
      'Dr. Layer-2 Tech',
      'Prof. Blockchain Scale',
      'Dr. Scaling Solutions',
      'Dr. High-Throughput',
    ],
    abstract:
      'We develop layer-2 scaling solutions that enable millions of transactions per second on blockchain networks. Our rollup technologies maintain security while dramatically improving throughput for mass adoption.',
    year: 2023,
    topics: ['blockchain', 'layer-2 scaling', 'rollups', 'high-throughput'],
    paperType: 'conference',
    publicationVenue: 'Scaling Blockchain Conference',
    citations: 1890,
    pdfUrl: 'https://example.com/papers/layer2-scaling-solutions.pdf',
  },
  // Technology - Cybersecurity
  {
    id: '72',
    title: 'Homomorphic Encryption for Privacy-Preserving Cloud Computing',
    authors: [
      'Dr. Homomorphic Crypto',
      'Prof. Privacy Cloud',
      'Dr. Encrypted Computing',
      'Dr. Secure Computation',
    ],
    abstract:
      'We implement practical homomorphic encryption schemes for privacy-preserving cloud computing. Our approach enables computation on encrypted data without decryption, ensuring complete data privacy in cloud environments.',
    year: 2024,
    topics: [
      'cybersecurity',
      'homomorphic encryption',
      'privacy-preserving computing',
      'cloud security',
    ],
    paperType: 'journal',
    publicationVenue: 'Journal of Computer Security',
    citations: 2670,
    pdfUrl: 'https://example.com/papers/homomorphic-encryption-cloud.pdf',
  },
  // AI/ML - Transformer Networks
  {
    id: '73',
    title: 'Mamba: Linear-Time Sequence Modeling with Selective State Spaces',
    authors: [
      'Dr. State Space',
      'Prof. Linear Time',
      'Dr. Selective Attention',
      'Dr. Sequence Modeling',
    ],
    abstract:
      'We introduce Mamba, a new architecture that combines the efficiency of linear attention mechanisms with selective state spaces for sequence modeling. Our approach achieves transformer-level performance while scaling linearly with sequence length.',
    year: 2024,
    topics: ['transformer networks', 'state space models', 'linear attention', 'sequence modeling'],
    paperType: 'conference',
    publicationVenue: 'ICLR',
    citations: 2780,
    pdfUrl: 'https://example.com/papers/mamba-state-spaces.pdf',
  },
  // AI/ML - Computer Vision
  {
    id: '74',
    title: 'Segment Anything Model 2: Unified Image and Video Segmentation',
    authors: [
      'Dr. SAM Expert',
      'Prof. Universal Segmentation',
      'Dr. Video Understanding',
      'Dr. Foundation Vision',
    ],
    abstract:
      'We present Segment Anything Model 2 (SAM-2), extending universal segmentation to video domains. Our model provides consistent object tracking and segmentation across video frames with minimal user interaction.',
    year: 2024,
    topics: ['computer vision', 'segmentation', 'video understanding', 'foundation models'],
    paperType: 'journal',
    publicationVenue: 'Computer Vision and Pattern Recognition',
    citations: 3450,
    pdfUrl: 'https://example.com/papers/sam-2-video-segmentation.pdf',
  },
  // AI/ML - NLP
  {
    id: '75',
    title: 'Chain-of-Thought Reasoning with Tool-Augmented Language Models',
    authors: [
      'Dr. Tool Augmented',
      'Prof. Reasoning AI',
      'Dr. Chain of Thought',
      'Dr. Language Tools',
    ],
    abstract:
      'We develop language models that combine chain-of-thought reasoning with external tool usage. Our approach enables models to solve complex problems by reasoning step-by-step while leveraging specialized tools for computation and information retrieval.',
    year: 2024,
    topics: ['natural language processing', 'chain-of-thought', 'tool augmentation', 'reasoning'],
    paperType: 'conference',
    publicationVenue: 'EMNLP',
    citations: 2340,
    pdfUrl: 'https://example.com/papers/tool-augmented-reasoning.pdf',
  },
  // Medicine - Cancer Research
  {
    id: '76',
    title: 'CRISPR-Cas13 Gene Editing Guided by AI for Precision Cancer Therapy',
    authors: [
      'Dr. CRISPR AI',
      'Prof. Gene Editing',
      'Dr. Precision Therapy',
      'Dr. Molecular Oncology',
    ],
    abstract:
      'We combine AI-guided target prediction with CRISPR-Cas13 gene editing for precision cancer therapy. Our approach identifies optimal therapeutic targets and designs personalized gene editing strategies for individual cancer patients.',
    year: 2024,
    topics: ['cancer research', 'CRISPR gene editing', 'precision therapy', 'AI-guided medicine'],
    paperType: 'journal',
    publicationVenue: 'Science Translational Medicine',
    citations: 3890,
    pdfUrl: 'https://example.com/papers/crispr-ai-cancer-therapy.pdf',
  },
  // Medicine - Drug Discovery
  {
    id: '77',
    title: 'Large Language Models for Automated Scientific Literature Review in Drug Discovery',
    authors: [
      'Dr. LLM Pharma',
      'Prof. Scientific Literature',
      'Dr. Automated Review',
      'Dr. Knowledge Mining',
    ],
    abstract:
      'We apply large language models to automate scientific literature review for drug discovery. Our system analyzes millions of research papers to identify drug-target relationships and predict novel therapeutic opportunities.',
    year: 2024,
    topics: ['drug discovery', 'large language models', 'literature mining', 'automated review'],
    paperType: 'journal',
    publicationVenue: 'Nature Biotechnology',
    citations: 2560,
    pdfUrl: 'https://example.com/papers/llm-drug-literature-review.pdf',
  },
  // Medicine - Medical Imaging
  {
    id: '78',
    title: 'Vision-Language Models for Automated Medical Report Generation',
    authors: [
      'Dr. Vision Language Med',
      'Prof. Report Generation',
      'Dr. Medical Automation',
      'Dr. Clinical AI',
    ],
    abstract:
      'We develop vision-language models that automatically generate comprehensive medical reports from imaging studies. Our system produces detailed, clinically accurate reports that assist radiologists in diagnosis and documentation.',
    year: 2023,
    topics: [
      'medical imaging',
      'vision-language models',
      'report generation',
      'clinical automation',
    ],
    paperType: 'journal',
    publicationVenue: 'Medical Image Analysis',
    citations: 2120,
    pdfUrl: 'https://example.com/papers/vision-language-medical-reports.pdf',
  },
  // Climate - Climate Change
  {
    id: '79',
    title: 'Foundation Models for Global Climate System Prediction and Analysis',
    authors: [
      'Dr. Climate Foundation',
      'Prof. Earth System',
      'Dr. Global Prediction',
      'Dr. Climate AI',
    ],
    abstract:
      'We develop foundation models trained on diverse climate data for global climate system prediction and analysis. Our unified model integrates atmospheric, oceanic, and land surface processes for comprehensive climate understanding.',
    year: 2024,
    topics: ['climate change', 'foundation models', 'climate prediction', 'earth system modeling'],
    paperType: 'journal',
    publicationVenue: 'Nature Climate Change',
    citations: 3120,
    pdfUrl: 'https://example.com/papers/climate-foundation-models.pdf',
  },
  // Climate - Renewable Energy
  {
    id: '80',
    title: 'AI-Optimized Agrivoltaics: Combining Solar Energy with Sustainable Agriculture',
    authors: [
      'Dr. Agrivoltaics',
      'Prof. Solar Agriculture',
      'Dr. Dual Land Use',
      'Dr. Sustainable Energy',
    ],
    abstract:
      'We optimize agrivoltaic systems that combine solar energy generation with sustainable agriculture. Our AI algorithms balance energy production and crop yield, maximizing dual land use efficiency while supporting food security.',
    year: 2024,
    topics: ['renewable energy', 'agrivoltaics', 'sustainable agriculture', 'dual land use'],
    paperType: 'conference',
    publicationVenue: 'Sustainable Energy and Agriculture Conference',
    citations: 1670,
    pdfUrl: 'https://example.com/papers/ai-agrivoltaics.pdf',
  },
  // Climate - Sustainability
  {
    id: '81',
    title: 'AI-Powered Life Cycle Assessment for Sustainable Product Design',
    authors: [
      'Dr. LCA AI',
      'Prof. Sustainable Design',
      'Dr. Life Cycle Analysis',
      'Dr. Product Sustainability',
    ],
    abstract:
      'We develop AI systems that perform comprehensive life cycle assessments for sustainable product design. Our approach evaluates environmental impact throughout product lifecycles, guiding eco-friendly design decisions.',
    year: 2023,
    topics: [
      'sustainability',
      'life cycle assessment',
      'sustainable design',
      'environmental impact',
    ],
    paperType: 'journal',
    publicationVenue: 'Journal of Industrial Ecology',
    citations: 1890,
    pdfUrl: 'https://example.com/papers/ai-life-cycle-assessment.pdf',
  },
  // Technology - Quantum Computing
  {
    id: '82',
    title: 'Quantum Federated Learning for Distributed Quantum Machine Learning',
    authors: [
      'Dr. Quantum Federated',
      'Prof. Distributed Quantum',
      'Dr. Quantum ML',
      'Dr. Federated Quantum',
    ],
    abstract:
      'We develop quantum federated learning protocols that enable distributed training of quantum machine learning models across multiple quantum devices. Our approach preserves data privacy while leveraging collective quantum computational power.',
    year: 2024,
    topics: [
      'quantum computing',
      'federated learning',
      'quantum machine learning',
      'distributed quantum',
    ],
    paperType: 'journal',
    publicationVenue: 'Quantum Machine Intelligence',
    citations: 2230,
    pdfUrl: 'https://example.com/papers/quantum-federated-learning.pdf',
  },
  // Technology - Blockchain
  {
    id: '83',
    title: 'AI-Driven Smart Contracts for Autonomous Decentralized Organizations',
    authors: [
      'Dr. Smart Contract AI',
      'Prof. Autonomous DAO',
      'Dr. Decentralized AI',
      'Dr. Blockchain Automation',
    ],
    abstract:
      'We create AI-driven smart contracts that enable truly autonomous decentralized organizations (DAOs). Our system makes intelligent decisions, adapts to changing conditions, and executes complex governance protocols automatically.',
    year: 2024,
    topics: ['blockchain', 'smart contracts', 'autonomous organizations', 'AI governance'],
    paperType: 'conference',
    publicationVenue: 'Decentralized Autonomous Organizations Conference',
    citations: 1780,
    pdfUrl: 'https://example.com/papers/ai-smart-contracts-dao.pdf',
  },
  // Technology - Cybersecurity
  {
    id: '84',
    title: 'Differential Privacy-Preserving Machine Learning for Sensitive Data Protection',
    authors: [
      'Dr. Differential Privacy',
      'Prof. Privacy ML',
      'Dr. Sensitive Data',
      'Dr. Privacy Protection',
    ],
    abstract:
      'We implement differential privacy mechanisms in machine learning systems to protect sensitive data while maintaining model utility. Our approach provides mathematically proven privacy guarantees for individuals in datasets.',
    year: 2024,
    topics: ['cybersecurity', 'differential privacy', 'privacy-preserving ML', 'data protection'],
    paperType: 'journal',
    publicationVenue: 'IEEE Transactions on Information Forensics and Security',
    citations: 2450,
    pdfUrl: 'https://example.com/papers/differential-privacy-ml.pdf',
  },
];

// Helper function to get papers by topic
export const getPapersByTopic = (topic: string): MockPaper[] => {
  return mockPapers.filter((paper) =>
    paper.topics.some((t) => t.toLowerCase().includes(topic.toLowerCase()))
  );
};

// Helper function to get recent papers
export const getRecentPapers = (yearThreshold: number = 2022): MockPaper[] => {
  return mockPapers.filter((paper) => paper.year >= yearThreshold);
};

// Helper function to get highly cited papers
export const getHighlyCitedPapers = (citationThreshold: number = 5000): MockPaper[] => {
  return mockPapers.filter((paper) => (paper.citations || 0) >= citationThreshold);
};

// Helper function to search papers
export const searchPapers = (query: string): MockPaper[] => {
  const searchTerm = query.toLowerCase();
  return mockPapers.filter(
    (paper) =>
      paper.title.toLowerCase().includes(searchTerm) ||
      paper.abstract.toLowerCase().includes(searchTerm) ||
      paper.authors.some((author) => author.toLowerCase().includes(searchTerm)) ||
      paper.topics.some((topic) => topic.toLowerCase().includes(searchTerm))
  );
};
