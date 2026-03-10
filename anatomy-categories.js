export const anatomyCategories = {
    // Основные системы, которые точно нужно показать
    bones: {
        keywords: ['bone', 'skull', 'rib', 'vertebra', 'sternum', 'clavicle', 'scapula', 
                  'femur', 'tibia', 'fibula', 'humerus', 'radius', 'ulna', 'patella',
                  'carpal', 'tarsal', 'metacarpal', 'metatarsal', 'phalanx', 
                  'calcaneus', 'cuboid', 'cuneiform', 'navicular', 'talus',
                  'incus', 'malleus', 'stapes', 'ethmoid', 'frontal', 'lacrimal',
                  'mandible', 'maxilla', 'nasal', 'occipital', 'palatine', 'parietal',
                  'sphenoid', 'temporal', 'vomer', 'zygomatic', 'hyoid'],
        visible: true
    },
    muscles: {
        keywords: ['muscle', 'brachii', 'femoris', 'deltoid', 'pectoral', 'gluteus',
                  'trapezius', 'latissimus', 'rectus', 'oblique', 'sphincter',
                  'biceps', 'triceps', 'quadriceps', 'sartorius', 'gracilis',
                  'gastrocnemius', 'soleus', 'masseter', 'temporalis', 'diaphragm',
                  'extensor', 'flexor', 'abductor', 'adductor', 'pronator', 'supinator'],
        visible: true
    },
    nerves: {
        keywords: ['nerve', 'nervus', 'ganglion', 'plexus', 'radial', 'ulnar', 'median',
                  'sciatic', 'facial', 'trigeminal', 'vagus', 'accessory', 'hypoglossal',
                  'oculomotor', 'trochlear', 'abducens', 'vestibulocochlear', 'glossopharyngeal',
                  'phrenic', 'axillary', 'musculocutaneous', 'femoral', 'obturator',
                  'tibial', 'fibular', 'pudendal', 'gluteal'],
        visible: true
    },
    arteries: {
        keywords: ['artery', 'arterial', 'aorta', 'carotid', 'femoral', 'popliteal',
                  'coronary', 'pulmonary', 'mesenteric', 'iliac', 'renal', 'splenic',
                  'hepatic', 'gastric', 'pancreatic', 'cerebral', 'meningeal',
                  'ophthalmic', 'facial', 'maxillary', 'temporal', 'occipital'],
        visible: true
    },
    veins: {
        keywords: ['vein', 'vena', 'cava', 'saphenous', 'portal', 'jugular', 'subclavian',
                  'azygos', 'iliac', 'renal', 'splenic', 'mesenteric', 'femoral',
                  'popliteal', 'tibial', 'fibular', 'cardiac', 'pulmonary'],
        visible: true
    },
    organs: {
        keywords: ['heart', 'liver', 'lung', 'kidney', 'spleen', 'pancreas', 'stomach',
                  'intestine', 'colon', 'bladder', 'brain', 'cerebellum', 'thalamus',
                  'hypothalamus', 'pituitary', 'thyroid', 'parathyroid', 'adrenal',
                  'thymus', 'prostate', 'testis', 'ovary', 'uterus', 'eye', 'tongue'],
        visible: true
    },
    ligaments: {
        keywords: ['ligament', 'cruciate', 'collateral', 'meniscus', 'labrum', 'capsule',
                  'fascia', 'aponeurosis', 'retinaculum', 'tendon', 'aponeurosis',
                  'symphysis', 'disc', 'meniscus'],
        visible: true
    },
    // Анатомические ориентиры (важно показать!)
    landmarks: {
        keywords: ['triangle', 'fossa', 'sulcus', 'gyrus', 'foramen', 'canal',
                  'hiatus', 'meatus', 'notch', 'fissure', 'hiatus', 'fovea',
                  'process', 'tubercle', 'tuberosity', 'condyle', 'epicondyle',
                  'spine', 'crest', 'line', 'angle', 'horn', 'cornu'],
        visible: true
    },
    // Поверхности и направления (нужно показать!)
    surfaces: {
        keywords: ['dorsal', 'palmar', 'plantar', 'ventral', 'anterior', 'posterior',
                  'medial', 'lateral', 'superior', 'inferior', 'cranial', 'caudal',
                  'proximal', 'distal', 'superficial', 'deep', 'surface', 'border',
                  'margin', 'region', 'fold', 'eminence', 'arch'],
        visible: true
    },
    // Вспомогательные элементы (скрываем)
    auxiliary: {
        keywords: ['plane', 'line', 'axis', 'direction', 'rotation', 'abduction', 
                  'adduction', 'flexion', 'extension', 'circumduction', 'eversion',
                  'inversion', 'pronation', 'supination', 'grid', 'helper', 'guide'],
        visible: false
    }
};