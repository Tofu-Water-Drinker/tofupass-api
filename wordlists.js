const fs = require('fs');
const path = require('path');

const adjectives = [
      'dancing', 'jumping', 'running', 'flying', 'singing',
    'leaping', 'diving', 'soaring', 'gliding', 'racing',
    'dashing', 'skating', 'floating', 'spinning', 'zooming',
    'bouncing', 'hopping', 'skipping', 'prancing', 'swirling',
    'twirling', 'whirling', 'sliding', 'cruising', 'rolling',
    'strolling', 'walking', 'marching', 'hiking', 'climbing',
    'swimming', 'surfing', 'sailing', 'rowing', 'paddling',
    'waving', 'giggling', 'hugging',
    'wiggling', 'nodding', 'pointing', 'reaching',
    'stretching', 'yawning', 'blinking', 'winking', 'tiptoeing',
    'crawling', 'chasing', 'catching', 'throwing', 'kicking',

    'dreaming', 'thinking', 'creating', 'making', 'building',
    'drawing', 'painting', 'writing', 'reading', 'learning', 'teaching',
    'sharing', 'growing', 'helping', 'leading', 'guiding', 'playing',
    'smiling', 'laughing', 'exploring', 'seeking', 'finding', 'discovering',
    'inventing', 'wishing', 'believing', 'imagining', 'wondering', 'guessing',
    'solving', 'counting', 'spelling', 'rhyming', 'humming', 'whistling',
    'pretending', 'daydreaming',

    'able', 'active', 'admirable', 'adorable', 'adventurous',
    'affectionate', 'agreeable', 'alert', 'amiable', 'ambitious',
    'amusing', 'angelic', 'articulate', 'astounding', 'attentive',
    'authentic', 'balanced', 'beloved', 'beneficial', 'blissful',
    'bonny', 'brave', 'bright', 'brilliant', 'bubbly',
    'calm', 'candid', 'capable', 'careful', 'caring',
    'cautious', 'centered', 'charming', 'charismatic', 'cheerful',
    'cheery', 'chipper', 'clean', 'clever', 'comical',
    'committed', 'compassionate', 'competent', 'confident', 'considerate',
    'consistent', 'content', 'cool', 'cooperative', 'courageous',
    'courteous', 'cozy', 'cuddly', 'curious', 'cute',
    'dandy', 'dapper', 'dear', 'decent', 'dedicated',
    'dependable', 'determined', 'devoted', 'diligent', 'eager',
    'ecstatic', 'educated', 'effective', 'efficient',
    'elated', 'eloquent', 'empathetic', 'enchanting', 'encouraging',
    'endearing', 'energetic', 'engaging', 'exceptional', 'excited',
    'exquisite', 'exuberant', 'fabulous', 'fair', 'faithful',
    'focused', 'forgiving', 'fortunate', 'friendly', 'funny',
    'generous', 'genial', 'gentle', 'genuine', 'giving',
    'glad', 'graceful', 'gracious', 'grand', 'grateful',
    'great', 'grounded', 'happy', 'hardworking', 'harmonious',
    'healthy', 'heartfelt', 'helpful', 'honest', 'honorable',
    'hopeful', 'humble', 'impressive', 'inclusive', 'independent',
    'industrious', 'ingenious', 'innocent', 'insightful', 'intelligent',
    'intuitive', 'jolly', 'joyful', 'keen', 'kind',
    'kingly', 'knightly', 'likable',
    'little', 'lovable', 'loving', 'loyal', 'lush',
    'magnificent', 'majestic', 'mature', 'meaningful', 'merciful',
    'merry', 'mild', 'mindful', 'modest', 'motivated',
    'neat', 'nice', 'nurturing', 'observant', 'open',
    'optimistic', 'orderly', 'organized', 'passionate', 'patient',
    'peaceful', 'peachy', 'perceptive', 'perky', 'persistent',
    'phenomenal', 'playful', 'plucky', 'poised', 'polished',
    'polite', 'positive', 'precious', 'pretty', 'princely',
    'productive', 'proficient', 'profound', 'protective', 'proud',
    'punctual', 'pure', 'purposeful', 'queenly', 'quick',
    'quiet', 'rational', 'realistic', 'ready', 'reassuring',
    'regal', 'relaxed', 'reliable', 'remarkable', 'resilient',
    'respected', 'respectful', 'responsible', 'robust', 'rosy',
    'safe', 'sassy', 'scenic', 'scholarly',
    'secure', 'selfless', 'sensible', 'sensitive', 'sharp',
    'shiny', 'silent', 'silly', 'simple', 'sincere',
    'skillful', 'sleek', 'smart', 'smooth', 'snappy',
    'snug', 'sociable', 'soft', 'soothing', 'sparkly',
    'spectacular', 'spirited', 'sprightly', 'stable', 'starry',
    'steadfast', 'still', 'storied', 'stunning', 'stupendous',
    'sturdy', 'supportive', 'sweet', 'sympathetic', 'tenacious',
    'tender', 'terrific', 'thankful', 'thoughtful', 'thriving',
    'tidy', 'top', 'treasured', 'trim', 'true',
    'trustworthy', 'trusty', 'truthful', 'twinkly', 'unbiased',
    'understanding', 'unselfish', 'upbeat', 'upstanding', 'valued',
    'versatile', 'vibrant', 'vigilant', 'vigorous', 'virtuous',
    'warm', 'whiz', 'wholesome', 'willing',
    'wise', 'wondrous', 'worthy', 'youthful', 'zappy',
    'zealous', 'zestful',

    'super', 'mega', 'hyper', 'ultra', 'wonder',
    'mighty', 'powerful', 'strong', 'bold', 'fierce',
    'valiant', 'fearless', 'heroic', 'daring', 'dynamic',
    'electric', 'turbo', 'sonic', 'swift', 'maximum', 'supreme',
    'ultimate', 'extreme', 'infinite', 'prime', 'champion',
    'elite', 'premium',

    'golden', 'silver', 'crystal', 'rainbow', 'shining', 'glowing',
    'sparkling', 'radiant', 'gleaming', 'colorful', 'vivid',
    'lustrous', 'pearly', 'shimmering', 'luminous', 'prismatic',
    'glittering', 'twinkling', 'beaming', 'dazzling', 'glinting',
    'flashing',

    'magic', 'mystic', 'divine', 'royal', 'noble',
    'epic', 'legendary', 'mythic', 'stellar', 'astral',
    'enchanted', 'fantastical', 'whimsical', 'ethereal', 'celestial',
    'arcane', 'fabled',

    'wild', 'natural', 'blooming', 'moonlit', 'starlit',
    'cloudy', 'rainy', 'snowy', 'misty', 'foggy',

    'rapid', 'fast', 'agile', 'nimble', 'speedy',
    'rushing', 'zipping', 'buzzing', 'whizzing', 'drifting',
    'sprinting', 'charging',

    'witty', 'quirky', 'zesty', 'snazzy', 'peppy',
    'jazzy', 'groovy', 'funky', 'zany', 'spunky',
    'zippy', 'bouncy', 'lively', 'giggly', 'joyous',
    'jubilant', 'gleeful',

    'digital', 'cyber', 'quantum', 'solar', 'lunar',
    'cosmic', 'galactic', 'atomic', 'binary', 'neural',
    'nano', 'giga', 'logic',

    'winning', 'leading', 'perfect', 'amazing', 'awesome',
    'excellent', 'superior', 'fantastic', 'incredible', 'marvelous',
    'splendid', 'outstanding', 'superb', 'notable', 'admired',
    'praised', 'honored', 'gifted', 'skilled', 'talented',
    'expert',

    'creative', 'artistic', 'musical', 'poetic', 'rhythmic',
    'melodic', 'harmonic', 'lyrical', 'elegant', 'refined',
    'stylish', 'classic', 'timeless', 'modern', 'fresh',
    'novel', 'unique', 'original', 'inspired', 'visionary',
    'imaginative', 'innovative', 'inventive',

    'blazing', 'breezy', 'gusty', 'stormy', 'windy',
    'icy', 'frosty', 'frozen', 'chilly', 'clear',
    'dewy',

    'timely', 'prompt', 'early', 'twilight', 'eternal',
    'forever', 'always', 'daily', 'weekly', 'monthly',
    'yearly', 'seasonal',

    'blessed', 'lucky', 'jovial', 'pleasant', 'delightful',
    'wonderful', 'lovely', 'special', 'valuable', 'cherished',
    'tranquil', 'serene',

    'aqua', 'azure', 'beige', 'blue', 'bronze', 'brown', 'coral', 'creamy', 'crimson', 'cyan',
    'emerald', 'fuchsia', 'gold', 'gray', 'green', 'indigo', 'ivory', 'jade', 'khaki', 'lavender',
    'lemon', 'lilac', 'lime', 'magenta', 'maroon', 'mint', 'navy', 'olive', 'orange', 'orchid',
    'peach', 'pink', 'plum', 'purple', 'red', 'rose', 'ruby', 'rusty', 'saffron', 'salmon',
    'sandy', 'sapphire', 'scarlet', 'sepia', 'sky', 'tan', 'teal', 'terra', 'topaz', 'turquoise',
    'violet', 'white', 'yellow',

    'fluttering', 'humming', 'murmuring', 'rustling', 'sighing', 'swishing',
    'tinkling', 'whispering', 'bobbing'];

const nouns = [
      'alpaca','ant','antelope','badger','bat','bear','bee','bird','bison','calf','camel','cat','cheetah',
      'chipmunk','cow','coyote','crab','cricket','deer','dog','dolphin','donkey','dove','duck','eagle','eel',
      'elephant','emu','falcon','ferret','fish','flamingo','fox','frog','gecko','gerbil','giraffe','goat',
      'goose','hamster','hare','hawk','hedgehog','hippo','horse','iguana','jaguar','kangaroo','kitten','koala',
      'lamb','lemur','leopard','lion','lizard','llama','lobster','meerkat','mole','moose','mouse','newt',
      'octopus','ostrich','otter','owl','panda','parrot','peacock','pelican','penguin','pig','platypus','pony',
      'puffin','puppy','quail','rabbit','raccoon','reindeer','rhino','rooster','seal','seahorse','shark',
      'sheep','skunk','sloth','snail','snake','sparrow','spider','squid','squirrel','starfish','swan',
      'tiger','toad','toucan','turtle','viper','vulture','walrus','whale','wolf','wombat','wren','yak','zebra',
      'alpaca', 'ant', 'antelope', 'badger', 'bat', 'bear', 'bee', 'bird', 'bison', 'bug',
    'calf', 'camel', 'cat', 'cheetah', 'chick', 'chicken', 'chipmunk', 'clam', 'colt', 'cow', 'coyote', 'crab', 'cricket', 'cub',
    'deer', 'dog', 'dolphin', 'donkey', 'dove', 'duck', 'eagle', 'eel', 'elephant', 'emu', 'falcon', 'fawn', 'ferret', 'finch', 'fish', 'flamingo', 'flea', 'foal', 'fox', 'frog',
    'gecko', 'gerbil', 'giraffe', 'goat', 'goose', 'guppy', 'hamster', 'hare', 'hawk', 'hedgehog', 'hen', 'hippo', 'hog', 'horse', 'hyena',
    'iguana', 'impala', 'jaguar', 'joey', 'kangaroo', 'kitten', 'koala', 'lamb', 'lark', 'lemur', 'leopard', 'lion', 'lizard', 'llama', 'lobster',
    'meerkat', 'minnow', 'mole', 'moose', 'moth', 'mouse', 'mule', 'newt', 'octopus', 'ostrich', 'otter', 'owl', 'ox', 'oyster',
    'panda', 'parrot', 'peacock', 'pelican', 'penguin', 'pet', 'pig', 'pigeon', 'platypus', 'pony', 'puffin', 'puppy', 'quail',
    'rabbit', 'raccoon', 'ram', 'rat', 'reindeer', 'rhino', 'rooster', 'seal', 'seahorse', 'shark', 'sheep', 'shrew', 'shrimp', 'skunk', 'sloth', 'snail', 'snake', 'sparrow', 'spider', 'squid', 'squirrel', 'starfish', 'stork', 'swan',
    'tadpole', 'termite', 'tiger', 'toad', 'toucan', 'trout', 'turkey', 'turtle', 'viper', 'vole', 'vulture', 'walrus', 'wasp', 'weasel', 'whale', 'wolf', 'wombat', 'worm', 'wren', 'yak', 'zebra',

    'airport', 'aquarium', 'aqueduct', 'arch', 'arena', 'barn', 'barracks', 'base', 'basement', 'bastion', 'bell', 'bridge', 'bungalow', 'bunker',
    'cabin', 'cafe', 'camp', 'canopy', 'capitol', 'castle', 'cellar', 'chalet', 'chamber', 'chapel', 'church', 'citadel', 'clinic', 'college', 'column', 'condo', 'corridor', 'cottage', 'cupola',
    'depot', 'dome', 'duplex', 'dwelling', 'edifice', 'elevator', 'embassy', 'factory', 'fort', 'fortress', 'foundry',
    'garage', 'gazebo', 'gym', 'hangar', 'harbor', 'haven', 'hospital', 'hostel', 'hotel', 'house', 'hut', 'hovel', 'igloo', 'inn',
    'keep', 'kennel', 'kiosk', 'kitchen', 'lab', 'library', 'lodge', 'loft',
    'mall', 'manor', 'mansion', 'market', 'mill', 'mine', 'minster', 'monument', 'mosque', 'motel', 'museum',
    'office', 'outpost', 'pagoda', 'palace', 'pavilion', 'pergola', 'pier', 'pillar', 'platform', 'plaza', 'post', 'prison', 'pub', 'pyramid',
    'quarters', 'ranch', 'refinery', 'resort', 'school', 'shack', 'shanty', 'shed', 'shelter', 'shop', 'silo', 'stable', 'stadium', 'stall', 'station', 'steeple', 'store',
    'tavern', 'temple', 'terminal', 'tomb', 'tower', 'tunnel', 'vault', 'veranda', 'villa', 'wigwam', 'windmill', 'workshop', 'zoo',

    'anklet', 'apron', 'armor', 'bandana', 'beanie', 'belt', 'bib', 'blazer', 'blouse', 'bonnet', 'boot', 'bow', 'bowtie', 'boxer', 'bracelet', 'buckle', 'button',
    'cap', 'cape', 'cardigan', 'cloak', 'clog', 'coat', 'collar', 'costume', 'crown', 'cuff', 'diaper', 'dress', 'earring',
    'frock', 'glove', 'gown', 'hat', 'headband', 'helmet', 'hoodie', 'jacket', 'jeans', 'jumper',
    'kilt', 'kimono', 'locket', 'mitten', 'necktie', 'outfit', 'overalls',
    'pajamas', 'pant', 'parka', 'pendant', 'pin', 'pocket', 'poncho', 'purse', 'ribbon', 'ring', 'robe',
    'sandal', 'sash', 'scarf', 'shawl', 'shirt', 'shoe', 'shorts', 'skirt', 'sleeve', 'slipper', 'sock', 'stole', 'suit', 'sweater',
    'tights', 'tiara', 'top', 'trousers', 'tshirt', 'tunic', 'tuxedo', 'umbrella', 'uniform', 'veil', 'vest', 'visor', 'wallet', 'watch', 'wig', 'zipper',

    'album', 'anchor', 'anvil', 'arrow', 'backpack', 'bag', 'basket', 'battery', 'bead', 'beam', 'bed', 'bench', 'binder', 'blanket', 'blender', 'bolt', 'bookmark', 'bottle', 'bowl',
    'brain', 'branch', 'brand', 'brooch', 'broom', 'brush', 'bubble', 'bucket', 'bulb', 'bundle', 'bunk', 'cabinet', 'cable', 'cage', 'calendar', 'candle', 'cane', 'canteen',
    'carpet', 'cart', 'case', 'cask', 'cauldron', 'ceiling', 'chain', 'chair', 'channel', 'chapter', 'charm', 'chart', 'chest', 'chisel', 'clasp', 'clock', 'clue', 'clutch', 'coaster', 'coin', 'comb',
    'cord', 'cork', 'couch', 'cover', 'cradle', 'crate', 'crest', 'crib', 'cross', 'crowbar', 'crutch', 'cue', 'cup', 'curtain', 'cushion', 'cylinder', 'deck', 'deed', 'desk', 'diary', 'diploma', 'disc',
    'dish', 'doorknob', 'doormat', 'dossier', 'door', 'drawer', 'dream', 'drill', 'drop', 'drum', 'duct', 'dumbbell', 'ear', 'elixir', 'envelope', 'eraser', 'essence', 'eye', 'face', 'fan', 'faucet', 'feather',
    'filter', 'fire', 'flag', 'flask', 'floor', 'food', 'foot', 'fork', 'frame', 'friend', 'funnel', 'furnace', 'fuse', 'gavel', 'gear', 'gem', 'gift',
    'globe', 'goggles', 'grail', 'grill', 'grip', 'hammer', 'hammock', 'handle', 'hanger', 'harness', 'harp', 'head', 'heart', 'hinge', 'hook', 'hoop', 'hose',
    'jar', 'jersey', 'jet', 'jewel', 'journal', 'jukebox', 'kettle', 'key', 'keychain', 'kindling', 'kit', 'knot', 'label', 'lace', 'ladle', 'lamp', 'lantern', 'latch',
    'leash', 'ledger', 'lens', 'letter', 'lever', 'lid', 'light', 'line', 'lock', 'log', 'loop', 'lotion', 'lute', 'magnet', 'mail', 'mallet', 'mantle', 'map',
    'mark', 'mat', 'mate', 'mattress', 'meal', 'mirror', 'mixer', 'mop', 'mortar', 'motor', 'mug', 'nail', 'name', 'neck', 'needle', 'net', 'nose', 'note',
    'nozzle', 'oar', 'object', 'ointment', 'outlet', 'oven', 'packet', 'paddle', 'padlock', 'page', 'pail', 'pair', 'palette', 'pan', 'panel', 'parcel',
    'part', 'passport', 'paste', 'patch', 'path', 'pedal', 'pendulum', 'perfume', 'pestle', 'photo', 'picture', 'pillow', 'pincers', 'pinwheel', 'pipe', 'pitcher', 'plan',
    'plank', 'plaque', 'plate', 'platter', 'pliers', 'plot', 'plunger', 'podium', 'poem', 'point', 'potion', 'pot', 'pouch', 'powder', 'prize', 'prop', 'pulley', 'pump',
    'quill', 'quilt', 'racket', 'raft', 'rag', 'rail', 'rake', 'receipt', 'record', 'reel', 'rivet', 'roller', 'roof', 'room', 'rope',
    'rotor', 'rudder', 'rug', 'rule', 'saddle', 'safe', 'sail', 'satchel', 'saw', 'scale', 'scoop', 'scraper', 'screw', 'scroll', 'seal', 'seat', 'seltzer', 'sextant',
    'shackle', 'shaker', 'shampoo', 'shape', 'shears', 'sheath', 'sheet', 'shelf', 'shingle', 'shovel', 'show', 'shower', 'shutter', 'sieve', 'sign', 'slab', 'sledge',
    'smile', 'smoke', 'soap', 'socket', 'sofa', 'solder', 'sound', 'spatula', 'spark', 'sphere', 'spike', 'spindle', 'sponge', 'spool', 'spoon', 'spot', 'spout', 'spray',
    'sprocket', 'spur', 'stack', 'staff', 'stage', 'stair', 'stamp', 'stapler', 'star', 'start', 'state', 'statue', 'stem', 'step', 'stereo', 'stick', 'sticker', 'stirrup', 'stitch',
    'stocking', 'stool', 'stop', 'stove', 'strap', 'straw', 'string', 'stripe', 'sword', 'syringe', 'table', 'tackle', 'tail', 'tale', 'tank', 'tankard', 'tape',
    'tarp', 'task', 'tassel', 'teacup', 'teapot', 'test', 'thermos', 'thimble', 'thread', 'throne', 'thumb', 'ticket', 'tinder', 'tip', 'tire', 'tissue', 'toaster', 'token', 'tome',
    'tongs', 'tonic', 'toolbox', 'tooth', 'torch', 'tote', 'touch', 'towel', 'track', 'trap', 'tray', 'treasure', 'trellis', 'trick', 'trinket', 'tripod', 'trophy', 'trowel', 'trumpet', 'trunk',
    'truss', 'tube', 'tureen', 'turn', 'tweezers', 'twine', 'twist', 'utensil', 'valve', 'vase', 'vial', 'view', 'violin', 'voice', 'wall', 'washer', 'web', 'wedge', 'wheel',
    'whisk', 'winch', 'wing', 'wish', 'word', 'work', 'world', 'wrench', 'year', 'yolk',

    'angel', 'archer', 'bard', 'beast', 'captain', 'champion', 'cleric', 'conjurer', 'creator', 'dragon', 'druid', 'dwarf', 'elf',
    'explorer', 'fairy', 'fighter', 'genie', 'giant', 'gnome', 'goblin', 'griffin', 'guardian', 'healer', 'hero', 'hunter', 'jester',
    'king', 'knight', 'legend', 'mage', 'mermaid', 'monk', 'monster', 'mystic', 'ninja', 'ogre', 'oracle',
    'paladin', 'pegasus', 'phoenix', 'pioneer', 'pirate', 'prince', 'princess', 'prophet', 'queen', 'ranger', 'rogue', 'sage', 'samurai',
    'scholar', 'scout', 'seer', 'sentinel', 'seeker', 'shaman', 'sorcerer', 'sprite', 'summoner', 'titan', 'unicorn', 'viking', 'warlock', 'warrior', 'witch', 'wizard',

    'almond', 'apple', 'apricot', 'avocado', 'bacon', 'bagel', 'banana', 'bean', 'beef', 'berry', 'biscuit', 'bread', 'broccoli', 'brownie', 'burger', 'burrito', 'butter',
    'cabbage', 'cake', 'candy', 'carrot', 'celery', 'cereal', 'cheese', 'chili', 'chips', 'cider', 'cinnamon', 'cocoa', 'coconut', 'coffee', 'cookie', 'corn', 'cracker', 'cucumber', 'cupcake', 'curry',
    'date', 'donut', 'dough', 'drink', 'egg', 'fig', 'flour', 'fries', 'fruit', 'fudge', 'garlic', 'ginger', 'grape', 'gravy', 'guava', 'gum', 'honey', 'hotdog', 'icecream',
    'jam', 'jelly', 'juice', 'kale', 'ketchup', 'kiwi', 'lemon', 'lettuce', 'lime', 'lollipop', 'mango', 'maple', 'milk', 'mint', 'muffin', 'mushroom', 'mustard',
    'nectar', 'noodle', 'nutmeg', 'oats', 'oil', 'olive', 'onion', 'orange', 'pancake', 'papaya', 'parsley', 'pasta', 'pastry', 'peanut', 'pear', 'peas', 'pepper', 'pesto', 'pickle', 'pie', 'pizza', 'plum', 'popcorn', 'potato', 'pretzel', 'pudding', 'pumpkin',
    'radish', 'raisin', 'ramen', 'rice', 'roll', 'salad', 'salmon', 'salsa', 'salt', 'sandwich', 'sauce', 'smoothie', 'soda', 'soup', 'spice', 'spinach', 'sprout', 'squash', 'steak', 'stew', 'sugar', 'sundae', 'sushi', 'sweets', 'syrup',
    'tart', 'tea', 'toast', 'toffee', 'tofu', 'tomato', 'treat', 'tuna', 'vanilla', 'veggie', 'vinegar', 'waffle', 'water', 'wheat', 'yogurt', 'zest',

    'alloy', 'aluminum', 'amber', 'asphalt', 'bamboo', 'brass', 'brick', 'bronze', 'burlap', 'canvas', 'carbon', 'cashmere', 'cement', 'ceramic', 'chalk', 'charcoal', 'chiffon', 'chrome', 'clay', 'cloth', 'coal', 'cobalt', 'concrete', 'copper', 'corduroy', 'cork', 'cotton', 'crystal',
    'denim', 'diamond', 'dirt', 'down', 'dust', 'dye', 'ebony', 'elastic', 'emerald', 'enamel', 'fabric', 'felt', 'fiber', 'flannel', 'fleece', 'flint', 'foil', 'fuel', 'fur',
    'garnet', 'gasoline', 'gauze', 'gel', 'gingham', 'glass', 'gold', 'granite', 'graphite', 'gravel', 'hemp', 'hide', 'ice', 'ink', 'iron', 'ivory', 'jade', 'jute',
    'lacquer', 'latex', 'leather', 'linen', 'lumber', 'mahogany', 'marble', 'masonry', 'material', 'mesh', 'metal', 'mineral', 'mohair', 'muslin', 'nickel', 'nylon',
    'oil', 'onyx', 'opal', 'paint', 'paper', 'papyrus', 'pearl', 'pebble', 'peridot', 'pewter', 'plaster', 'plastic', 'platinum', 'plywood', 'pottery', 'pumice', 'putty',
    'quartz', 'rayon', 'resin', 'ruby', 'satin', 'sawdust', 'sequin', 'shale', 'silicon', 'silk', 'silver', 'spandex', 'stucco', 'suede',
    'taffeta', 'tar', 'teak', 'textile', 'thatch', 'tile', 'timber', 'titanium', 'topaz', 'tulle', 'tungsten', 'turf', 'tweed', 'uranium', 'varnish', 'velvet', 'veneer', 'vinyl', 'wax', 'webbing', 'wicker', 'wire', 'wool', 'yarn', 'zinc',

    'aria', 'art', 'ballad', 'ballet', 'band', 'banjo', 'bass', 'bongo', 'canon', 'cantata', 'carving', 'cello', 'choir', 'chord', 'chorus', 'clarinet', 'classic', 'collage', 'color', 'comedy', 'compose', 'concert', 'craft', 'cymbal',
    'dance', 'design', 'drama', 'drawing', 'drums', 'duet', 'exhibit', 'fiddle', 'film', 'finale', 'flute', 'folk', 'fresco', 'gallery', 'gong', 'guitar', 'haiku', 'harmony', 'horn', 'hue', 'hymn',
    'image', 'jazz', 'jingle', 'limerick', 'lyre', 'melody', 'mosaic', 'movie', 'mural', 'muse', 'music',
    'oboe', 'ode', 'opera', 'pastel', 'piano', 'piece', 'pigment', 'poetry', 'portrait', 'prose',
    'quartet', 'refrain', 'rhythm', 'rock', 'sax', 'scenery', 'scene', 'score', 'serenade', 'sketch', 'solo', 'sonata', 'song', 'sonnet', 'soprano', 'stanza', 'story', 'studio', 'symphony',
    'tango', 'tempo', 'tenor', 'theater', 'theme', 'tone', 'trio', 'trombone', 'trumpet', 'tuba', 'tune', 'verse', 'viola', 'vocal', 'waltz',

    'acorn', 'ash', 'bark', 'blossom', 'boulder', 'brook', 'bud', 'bulb', 'canyon', 'cave', 'chasm', 'cliff', 'cloud', 'clover', 'cone', 'coral', 'cove', 'crater', 'creek',
    'daisy', 'dell', 'delta', 'desert', 'dew', 'dune', 'earth', 'ember', 'fern', 'field', 'fjord', 'flower', 'foam', 'fog', 'forest', 'frost', 'geode', 'geyser', 'glacier', 'gorge', 'grass', 'grove', 'gully',
    'heath', 'hill', 'holly', 'iceberg', 'inlet', 'island', 'isle', 'ivy', 'jungle', 'kelp', 'knoll', 'lagoon', 'lake', 'land', 'lava', 'lawn', 'leaf', 'ledge',
    'magma', 'maple', 'marsh', 'meadow', 'mesa', 'mist', 'moor', 'moss', 'mountain', 'mud', 'nest', 'nook', 'north', 'nut', 'oak', 'oasis', 'ocean', 'orchard',
    'pasture', 'peak', 'pine', 'plain', 'plant', 'plateau', 'pond', 'pool', 'poppy', 'prairie', 'ravine', 'reed', 'reef', 'ridge', 'river', 'root', 'rose',
    'sand', 'sap', 'savanna', 'scrub', 'sea', 'sediment', 'shell', 'shore', 'silt', 'sky', 'snow', 'soil', 'south', 'steam', 'stone', 'stream', 'stump', 'sun', 'swamp',
    'thicket', 'thorn', 'tide', 'trail', 'tree', 'tulip', 'tundra', 'twig', 'vale', 'valley', 'vine', 'volcano', 'west', 'willow', 'wind', 'woods',

    'alley', 'avenue', 'bay', 'beach', 'campus', 'city', 'coast', 'colony', 'corner', 'country', 'court', 'district', 'dock', 'domain', 'dojo', 'dorm', 'estate',
    'fair', 'farm', 'garden', 'highway', 'home', 'junction', 'landmark', 'lane', 'lobby', 'park', 'parish',
    'port', 'realm', 'region', 'route', 'site', 'spa', 'square', 'street', 'suite', 'terrace', 'town', 'venue', 'village', 'wharf', 'yard', 'zone',

    'actor', 'agent', 'artist', 'athlete', 'author', 'baker', 'barber', 'builder', 'butler', 'cashier', 'chef', 'clerk', 'coach', 'coder', 'cook', 'dancer', 'dean', 'dentist', 'designer', 'director', 'doctor', 'driver',
    'editor', 'engineer', 'farmer', 'fireman', 'fisher', 'florist', 'gardener', 'guard', 'guide', 'guru', 'helper', 'host', 'intern', 'inventor', 'janitor', 'jockey', 'judge',
    'lawyer', 'leader', 'lecturer', 'manager', 'mason', 'mayor', 'mechanic', 'mentor', 'merchant', 'model', 'musician', 'notary', 'nurse', 'officer', 'operator',
    'painter', 'partner', 'pastor', 'patron', 'pilot', 'plumber', 'poet', 'police', 'porter', 'priest', 'producer',
    'racer', 'referee', 'reporter', 'sailor', 'salesman', 'sculptor', 'security', 'senator', 'sheriff', 'singer', 'smith', 'soldier', 'speaker', 'sponsor', 'spy', 'steward', 'student', 'surgeon', 'surveyor',
    'tailor', 'teacher', 'trader', 'trainer', 'tutor', 'usher', 'valet', 'vendor', 'vet', 'waiter', 'warden', 'welder', 'worker', 'writer',

    'analysis', 'anatomy', 'atom', 'beaker', 'biology', 'botany', 'calculus', 'cell', 'climate', 'compass', 'constant', 'current', 'cycle', 'diagram', 'dna',
    'ecology', 'element', 'energy', 'enzyme', 'equation', 'era', 'evidence', 'fact', 'formula', 'fossil', 'fungus', 'fusion', 'gas', 'gene', 'genus', 'geology', 'graph', 'gravity', 'growth',
    'helix', 'index', 'ion', 'kilogram', 'laser', 'liquid', 'logic', 'mass', 'matter', 'measure', 'medicine', 'meter', 'method', 'microbe', 'mixture', 'molecule', 'momentum', 'motion', 'mutation',
    'neutron', 'nucleus', 'optics', 'organism', 'particle', 'phase', 'physics', 'piston', 'plasma', 'prism', 'process', 'project', 'property', 'protein', 'proton', 'pulley', 'quantum',
    'reaction', 'reflex', 'research', 'result', 'sample', 'science', 'scope', 'solution', 'solvent', 'species', 'spectrum', 'speed', 'spore', 'stimulus', 'study', 'symbol', 'symptom',
    'theorem', 'theory', 'toxin', 'trait', 'universe', 'vacuum', 'variable', 'velocity', 'virus', 'volt', 'volume', 'wave', 'weight', 'zoology',

    'asteroid', 'astro', 'aurora', 'cluster', 'comet', 'cosmic', 'cosmos', 'eclipse', 'galaxy', 'jupiter', 'lunar', 'mars', 'meteor', 'milkyway', 'moon', 'nebula', 'neptune', 'nova', 'orbit', 'planet', 'pulsar', 'quasar', 'rocket', 'saturn', 'solar', 'space', 'star', 'sunset', 'venus', 'zenith',

    'badge', 'banner', 'baseball', 'basket', 'bowling', 'boxing', 'card', 'chaser', 'checkers', 'chess', 'cricket', 'cup', 'curling', 'dart', 'domino', 'draft',
    'fencing', 'football', 'frisbee', 'game', 'goal', 'golf', 'gymnast', 'handball', 'hike', 'hockey', 'homerun', 'hurdle', 'jigsaw', 'jog', 'judo', 'jump', 'karate',
    'lacrosse', 'league', 'level', 'marathon', 'match', 'medal', 'mission', 'pingpong', 'pitch', 'play', 'player', 'polo', 'puck',
    'quest', 'race', 'racing', 'relay', 'riddle', 'rink', 'rugby', 'run', 'runner', 'score', 'shield', 'skate', 'ski', 'sled', 'soccer', 'sport', 'sprint', 'squash', 'surf', 'swim',
    'team', 'tennis', 'trek', 'trophy', 'umpire', 'victory', 'volley', 'weight', 'winner', 'wrestle',

    'app', 'archive', 'avatar', 'beacon', 'bot', 'browser', 'bug', 'cache', 'camera', 'chip', 'circuit', 'cloud', 'code', 'command', 'compiler', 'computer', 'console', 'cookie', 'core', 'crypto', 'cursor', 'cyber',
    'database', 'data', 'desktop', 'device', 'digital', 'disk', 'display', 'domain', 'drone', 'file', 'firewall', 'firmware', 'folder', 'font', 'freeware',
    'gadget', 'gateway', 'glitch', 'grid', 'hardware', 'homepage', 'host', 'hub', 'icon', 'inkjet', 'input', 'internet', 'ip', 'joystick', 'kernel', 'keyboard', 'keyword',
    'laptop', 'link', 'login', 'malware', 'matrix', 'memory', 'modem', 'monitor', 'mouse', 'network', 'node', 'output', 'packet', 'password', 'patch', 'phone', 'phishing', 'pixel', 'plugin', 'podcast', 'port', 'portal', 'printer', 'program', 'protocol', 'proxy',
    'query', 'radio', 'ram', 'rom', 'router', 'scanner', 'screen', 'script', 'search', 'sensor', 'server', 'signal', 'software', 'spam', 'storage', 'switch', 'syntax', 'system',
    'tablet', 'tag', 'toolbar', 'upload', 'url', 'user', 'vector', 'virus', 'webcam', 'website', 'widget', 'window', 'wireless',

    'age', 'autumn', 'century', 'clock', 'date', 'dawn', 'day', 'decade', 'duration', 'dusk', 'eon', 'epoch', 'era', 'eternity', 'evening', 'festival', 'friday', 'future',
    'half', 'holiday', 'hour', 'history', 'interval', 'jiffy', 'legacy', 'lifetime', 'midnight', 'minute', 'moment', 'monday', 'month', 'morning', 'night', 'noon', 'period', 'phase', 'present',
    'quarter', 'season', 'second', 'semester', 'sequence', 'session', 'span', 'spell', 'spring', 'stage', 'summer', 'term', 'timeline', 'timer', 'today', 'tomorrow', 'tonight', 'twilight', 'watch', 'week', 'weekend', 'winter', 'year',

    'alphabet', 'arcade', 'ball', 'ballpit', 'balloon', 'beanbag', 'bingo', 'blocks', 'board', 'bouncer', 'box', 'bucket', 'bubbles', 'cards', 'clay', 'climber', 'colors', 'costume', 'crayons', 'cube',
    'dice', 'doll', 'easel', 'fort', 'goo', 'hobby', 'jacks', 'jumprope', 'kite', 'lego', 'marbles', 'mask', 'maze',
    'party', 'pawns', 'pen', 'pencil', 'pieces', 'pinball', 'playdoh', 'playset', 'plush', 'pogo', 'poker', 'puppet', 'puzzle',
    'racecar', 'rattle', 'rocker', 'rope', 'sandbox', 'scooter', 'seesaw', 'set', 'skates', 'slide', 'slime', 'sling', 'slinky', 'spinner', 'squares', 'stickers', 'stones',
    'swing', 'target', 'teddy', 'tent', 'tiles', 'tinker', 'toy', 'trainset', 'tricycle', 'truck', 'video', 'wagon', 'wand', 'watergun', 'whistle', 'windup', 'yoyo', 'zoom',

    'aircraft', 'auto', 'barge', 'bicycle', 'blimp', 'boat', 'buggy', 'bus', 'cab', 'canoe', 'car', 'caravan', 'cargo', 'carriage', 'chariot', 'chopper', 'coach', 'copter', 'conveyer', 'coupe', 'crane', 'cruiser',
    'digger', 'dinghy', 'engine', 'express', 'ferry', 'flight', 'forklift', 'glider', 'gondola', 'jeep', 'journey', 'kayak', 'limo', 'lorry',
    'metro', 'minivan', 'monorail', 'moped', 'motorcar', 'pickup', 'plane', 'rickshaw', 'roadster', 'rover', 'sailboat', 'sedan', 'ship', 'shuttle', 'sleigh', 'steamer', 'stroller', 'subway',
    'tanker', 'taxi', 'tractor', 'trailer', 'train', 'tram', 'trolley', 'tugboat', 'unicycle', 'van', 'vehicle', 'vessel', 'voyage', 'yacht', 'zeppelin',

    'blizzard', 'breeze', 'climate', 'cloudy', 'cyclone', 'dew', 'drizzle', 'drought', 'flood', 'flurry', 'foggy', 'frost', 'gale', 'hail', 'haze', 'heatwave', 'humidity', 'ice',
    'mist', 'misty', 'monsoon', 'overcast', 'rain', 'rainbow', 'shower', 'sleet', 'smog', 'snow', 'storm', 'stormy', 'sun', 'sunny', 'sunshine', 'tempest', 'thaw', 'thunder', 'tornado', 'typhoon', 'vapor', 'weather', 'wind'];

const specials = ["!", "@", "#", "$", "?", "*"];

const words = (text) => text.trim().split(/\s+/).filter(Boolean);

const loadPassphraseWords = () => {
    const passphrasePath = path.join(__dirname, 'passphraseWords.txt');

    if (!fs.existsSync(passphrasePath)) {
        return [...adjectives, ...nouns];
    }

    return fs
        .readFileSync(passphrasePath, 'utf8')
        .split(/\r?\n/)
        .map((word) => word.trim())
        .filter(Boolean);
};

const loadLocalizedWordList = (lang) => {
    const localizedPath = path.join(__dirname, 'localized-wordlists', `${lang}.json`);

    if (!fs.existsSync(localizedPath)) {
        return null;
    }

    return JSON.parse(fs.readFileSync(localizedPath, 'utf8'));
};

const createLocalizedWordList = (firstText, secondText, passphraseText) => {
    const firstList = words(firstText);
    const secondList = words(secondText);
    const passphraseList = [...firstList, ...secondList, ...words(passphraseText)]
        .map((word) => word.toLocaleLowerCase());

    return {
        firstWords: firstList,
        secondWords: secondList,
        passphraseWords: passphraseList,
    };
};

const firstWords = adjectives;
const secondWords = nouns;
const passphraseWords = loadPassphraseWords();
const specialChars = specials;
const translatedLanguages = {
    es: loadLocalizedWordList('es'),
    pt: loadLocalizedWordList('pt'),
    fr: loadLocalizedWordList('fr'),
    de: loadLocalizedWordList('de'),
    ja: loadLocalizedWordList('ja'),
    'zh-cn': loadLocalizedWordList('zh-cn'),
    ar: loadLocalizedWordList('ar'),
    id: loadLocalizedWordList('id'),
    hi: loadLocalizedWordList('hi'),
    ru: loadLocalizedWordList('ru'),
};

const wordListsByLanguage = {
    en: { firstWords, secondWords, passphraseWords },
    es: translatedLanguages.es || createLocalizedWordList(
        `Alegre Amable Brillante Valiente Dulce Fuerte Feliz Noble Rapido Suave Sereno Claro Creativo Curioso Dorado Fresco Gentil Luminoso Magico Pacifico Radiante Sabio Tranquilo Vivo`,
        `Amigo Arbol Brisa Campo Casa Cielo Estrella Flor Fuente Isla Jardin Lago Libro Luna Mar Monte Nube Piedra Playa Puente Rio Sendero Sol Tesoro Viento`,
        `abrazo aventura bosque camino cancion ciudad colina corazon cristal cuento familia faro fiesta fuego globo hoja idea juego luz mapa mercado musica noche palabra papel puerto risa ruta semilla sombra sueno taza tierra viaje zapato`
    ),
    pt: translatedLanguages.pt || createLocalizedWordList(
        `Alegre Amavel Brilhante Corajoso Doce Forte Feliz Nobre Rapido Suave Sereno Claro Criativo Curioso Dourado Fresco Gentil Luminoso Magico Pacifico Radiante Sabio Tranquilo Vivo`,
        `Amigo Arvore Brisa Campo Casa Ceu Estrela Flor Fonte Ilha Jardim Lago Livro Lua Mar Monte Nuvem Pedra Praia Ponte Rio Caminho Sol Tesouro Vento`,
        `abraco aventura bosque canção cidade colina coracao cristal conto familia farol festa fogo globo folha ideia jogo luz mapa mercado musica noite palavra papel porto riso rota semente sombra sonho taca terra viagem sapato`
    ),
    fr: translatedLanguages.fr || createLocalizedWordList(
        `Joyeux Aimable Brillant Courageux Doux Fort Heureux Noble Rapide Calme Serein Clair Creatif Curieux Dore Frais Gentil Lumineux Magique Paisible Radieux Sage Tranquille Vivant`,
        `Ami Arbre Brise Champ Maison Ciel Etoile Fleur Fontaine Ile Jardin Lac Livre Lune Mer Mont Nuage Pierre Plage Pont Riviere Sentier Soleil Tresor Vent`,
        `accolade aventure bois chemin chanson ville colline coeur cristal conte famille phare fete feu globe feuille idee jeu lumiere carte marche musique nuit mot papier port rire route graine ombre reve tasse terre voyage chaussure`
    ),
    de: translatedLanguages.de || createLocalizedWordList(
        `Froh Freundlich Hell Mutig Sanft Stark Gluecklich Edel Schnell Ruhig Heiter Klar Kreativ Neugierig Golden Frisch Guetig Leuchtend Magisch Friedlich Strahlend Weise Still Lebendig`,
        `Freund Baum Brise Feld Haus Himmel Stern Blume Quelle Insel Garten See Buch Mond Meer Berg Wolke Stein Strand Bruecke Fluss Pfad Sonne Schatz Wind`,
        `umarmung abenteuer wald weg lied stadt huegel herz kristall maerchen familie leuchtturm fest feuer globus blatt idee spiel licht karte markt musik nacht wort papier hafen lachen route samen schatten traum tasse erde reise schuh`
    ),
    ja: translatedLanguages.ja || createLocalizedWordList(
        `あかるい やさしい きらめく つよい あまい げんき しあわせ すてき はやい おだやか しずかな きれい そうぞうてき ふしぎ きんいろ さわやか しんせつ ひかる まほう へいわ かがやく かしこい のんびり いきいき`,
        `ともだち き そよかぜ はらっぱ いえ そら ほし はな いずみ しま にわ みずうみ ほん つき うみ やま くも いし はま はし かわ こみち たいよう たからもの かぜ`,
        `だっこ ぼうけん もり みち うた まち おか こころ すいしょう ものがたり かぞく とうだい おまつり ひ ちきゅう はっぱ ひらめき あそび ひかり ちず いちば おんがく よる ことば かみ みなと わらい たび たね かげ ゆめ ちゃわん だいち りょこう くつ`
    ),
    'zh-cn': translatedLanguages['zh-cn'] || createLocalizedWordList(
        `快乐 友善 明亮 勇敢 温柔 强壮 幸运 高贵 快速 平静 清澈 聪慧 创意 好奇 金色 清新 亲切 闪亮 神奇 和平 灿烂 睿智 安宁 鲜活`,
        `朋友 树木 微风 田野 房子 天空 星星 花朵 泉水 岛屿 花园 湖泊 书本 月亮 大海 山峰 云朵 石头 海滩 桥梁 河流 小路 太阳 宝藏 风儿`,
        `拥抱 冒险 森林 道路 歌声 城市 山丘 心灵 水晶 故事 家庭 灯塔 节日 火焰 地球 叶子 灵感 游戏 光芒 地图 市场 音乐 夜晚 词语 纸张 港口 笑声 旅程 种子 影子 梦想 茶杯 土地 旅行 鞋子`
    ),
    ar: translatedLanguages.ar || createLocalizedWordList(
        `سعيد لطيف مشرق شجاع حلو قوي فرح نبيل سريع هادئ صاف مبدع فضولي ذهبي نقي كريم لامع سحري مسالم متألق حكيم وديع حي جميل`,
        `صديق شجرة نسيم حقل بيت سماء نجمة زهرة نبع جزيرة حديقة بحيرة كتاب قمر بحر جبل غيمة حجر شاطئ جسر نهر طريق شمس كنز ريح`,
        `عناق مغامرة غابة مسار اغنية مدينة تل قلب بلور قصة عائلة منارة عيد نار عالم ورقة فكرة لعبة ضوء خريطة سوق موسيقى ليل كلمة ورق ميناء ضحكة رحلة بذرة ظل حلم كأس ارض سفر حذاء`
    ),
    id: translatedLanguages.id || createLocalizedWordList(
        `Ceria Ramah Cerah Berani Manis Kuat Bahagia Mulia Cepat Lembut Tenang Jernih Kreatif InginTahu Emas Segar Baik Bercahaya Ajaib Damai Bersinar Bijak Santai Hidup`,
        `Teman Pohon Padang Lapangan Rumah Langit Bintang Bunga MataAir Pulau Taman Danau Buku Bulan Laut Gunung Awan Batu Pantai Jembatan Sungai Jalan Matahari Harta Angin`,
        `pelukan petualangan hutan jalur lagu kota bukit hati kristal cerita keluarga mercusuar pesta api dunia daun ide permainan cahaya peta pasar musik malam kata kertas pelabuhan tawa rute benih bayang mimpi cangkir tanah perjalanan sepatu`
    ),
    hi: translatedLanguages.hi || createLocalizedWordList(
        `खुश दयालु चमकीला बहादुर मीठा मजबूत प्रसन्न श्रेष्ठ तेज शांत निर्मल रचनात्मक जिज्ञासु सुनहरा ताजा कोमल उज्ज्वल जादुई शांतिपूर्ण दमकता बुद्धिमान सहज जीवंत`,
        `मित्र पेड़ हवा मैदान घर आकाश तारा फूल झरना द्वीप बगीचा झील किताब चाँद समुद्र पहाड़ बादल पत्थर तट पुल नदी रास्ता सूरज खजाना पवन`,
        `आलिंगन साहस जंगल मार्ग गीत शहर पहाड़ी दिल क्रिस्टल कहानी परिवार प्रकाशस्तंभ उत्सव आग दुनिया पत्ता विचार खेल रोशनी नक्शा बाजार संगीत रात शब्द कागज बंदरगाह हँसी यात्रा बीज छाया सपना प्याला धरती सफर जूता`
    ),
    ru: translatedLanguages.ru || createLocalizedWordList(
        `Радостный Добрый Яркий Смелый Сладкий Сильный Счастливый Благородный Быстрый Мягкий Спокойный Чистый Творческий Любопытный Золотой Свежий Нежный Светлый Волшебный Мирный Сияющий Мудрый Тихий Живой`,
        `Друг Дерево Бриз Поле Дом Небо Звезда Цветок Родник Остров Сад Озеро Книга Луна Море Гора Облако Камень Пляж Мост Река Тропа Солнце Сокровище Ветер`,
        `объятие приключение лес путь песня город холм сердце кристалл сказка семья маяк праздник огонь мир лист идея игра свет карта рынок музыка ночь слово бумага порт смех маршрут семя тень мечта чашка земля поездка обувь`
    ),
};

const languageAliases = {
    'en-us': 'en',
    'en-gb': 'en',
    'es-es': 'es',
    'es-mx': 'es',
    'pt-br': 'pt',
    'pt-pt': 'pt',
    'fr-fr': 'fr',
    'de-de': 'de',
    'ja-jp': 'ja',
    zh: 'zh-cn',
    'zh-hans': 'zh-cn',
    'zh-sg': 'zh-cn',
    'ar-sa': 'ar',
    'id-id': 'id',
    'hi-in': 'hi',
    'ru-ru': 'ru',
};

const normalizeLanguageCode = (lang) => {
    const normalized = String(lang || 'en').trim().toLowerCase().replace(/_/g, '-');

    if (languageAliases[normalized]) {
        return languageAliases[normalized];
    }

    if (wordListsByLanguage[normalized]) {
        return normalized;
    }

    const baseCode = normalized.split('-')[0];
    return wordListsByLanguage[baseCode] ? baseCode : 'en';
};

const getWordLists = (lang) => wordListsByLanguage[normalizeLanguageCode(lang)];
const supportedLanguages = Object.freeze(Object.keys(wordListsByLanguage));

module.exports = {
    firstWords,
    secondWords,
    passphraseWords,
    specialChars,
    getWordLists,
    supportedLanguages,
};
