export const list = [
    { text: 'i', start: 140.510145, page: 1 },
    { text: 'ɝ', start: 149.16148, page: 1 },
    { text: 'a', start: 131.429802, page: 1 },
    { text: 'ɔ', start: 171.189316, page: 1 },
    { text: 'u', start: 180.654306, page: 1 },

    { text: 'ɪ', start: 135.602675, page: 1 },
    { text: 'ɛ', start: 144.467887, page: 1 },
    { text: 'æ', start: 153.700604, page: 1 },
    { text: 'ə', start: 185.361191, page: 1 },
    { text: 'ʌ', start: 161.843418, page: 1 },
    { text: 'ɒ', start: 166.510652, page: 1 },
    { text: 'ʊ', start: 175.971786, page: 1 },

    { text: 'eɪ', start: 94.601669, page: 1 },
    { text: 'aɪ', start: 99.872042, page: 1 },
    { text: 'ɔɪ', start: 104.305814, page: 1 },
    { text: 'aʊ', start: 113.771062, page: 1 },
    { text: 'oʊ', start: 108.649539, page: 1 },
    { text: 'ar', start: 157.692991, page: 1 },
    { text: 'ɪr', start: 117.030706, page: 1 },
    { text: 'ɛr', start: 120.711356, page: 1 },
    { text: 'ʊr', start: 124.141151, page: 1 },
    { text: 'ju', start: 128.295177, page: 1 },

    { text: 'p', start: 0, page: 1 },
    { text: 't', start: 6.851234, page: 1 },
    { text: 'k', start: 19.802917, page: 1 },
    { text: 'f', start: 25.657559, page: 1 },
    { text: 'θ', start: 34.408206, page: 1 },
    { text: 's', start: 44.453561, page: 1 },
    { text: 'ʃ', start: 54.226019, page: 1 },
    { text: 'h', start: 63.074822, page: 1 },
    { text: 'tʃ', start: 12.873553, page: 1 },

    { text: 'b', start: 3.807495, page: 1 },
    { text: 'd', start: 9.965973, page: 1 },
    { text: 'g', start: 22.464428, page: 1 },
    { text: 'v', start: 30.054787, page: 1 },
    { text: 'ð', start: 38.422541, page: 1 },
    { text: 'z', start: 49.527625, page: 1 },
    { text: 'ʒ', start: 58.539761, page: 1 },
    { text: 'r', start: 83.630749, page: 1 },
    { text: 'dʒ', start: 16.307223, page: 1 },
    { text: 'm', start: 66.174372, page: 1 },
    { text: 'n', start: 70.522094, page: 1 },
    { text: 'ŋ', start: 75.155253, page: 1 },
    { text: 'l', start: 79.148829, page: 1 },
    { text: 'j', start: 91.418903, page: 1 },
    { text: 'w', start: 88.323028, page: 1 }
]
/**
 * 建立一个map，用于取end
 * key   value
 * text   end
 */
let sortedList = list.map((i) => i).sort((a, b) => a.start - b.start)
export const endMap = new Map(
    sortedList.map((item, index) => [
        item.text,
        sortedList[index + 1]?.start || null
    ])
)

let map = {
    i: 5,
    ɪ: 7,
    e: 11,
    ɛ: 13,
    æ: 15,
    a: 17,
    ar: 19,
    ɔ: 21,
    ɔr: 23,
    ɔɪ: 25,
    o: 27,
    u: 29,
    ʊ: 31,
    ʊr: 33,
    ʌ: 35,
    ə: 37,
    ɝ: 40,
    ɚ: 42,
    aɪ: 44,
    aʊ: 46,
    ɛr: 48,
    ɪr: 50,
    ɪə: 50,
    iə: 50,
    p: 57,
    b: 60,
    t: 63,
    d: 65,
    k: 68,
    g: 70,
    f: 73,
    v: 75,
    θ: 77,
    ð: 79,
    s: 81,
    z: 84,
    ʃ: 87,
    ʒ: 89,
    tʃ: 91,
    dʒ: 93,
    m: 96,
    n: 98,
    ŋ: 100,
    l: 102,
    r: 104,
    j: 106,
    h: 109,
    w: 111
}
export const pdfMap = new Map(Object.entries(map))
