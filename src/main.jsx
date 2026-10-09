import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Cpu,
  Layers3,
  Mail,
  MapPin,
  MonitorPlay,
  Phone,
  Sparkles,
} from 'lucide-react'
import './styles.css'

const profile = {
  name: '梁锦熙',
  alias: 'Keyson',
  roles: '视觉设计师 / AI 设计师 / 渲染设计师',
  location: '广东 · 深圳',
  phone: '137-0220-7613',
  email: '462692311@qq.com',
}

const metrics = [
  { value: '6+', label: '年渲染视觉设计经验' },
  { value: '多品类', label: '消费电子与个护项目' },
  { value: '全链路', label: '渲染到电商落地' },
  { value: '多场景', label: '主图 / 详情 / 活动 / 品牌' },
]

const experiences = [
  {
    company: '深圳市沃听科技有限公司',
    role: '渲染视觉设计师',
    time: '2025.03 - 2026.06',
    text: '负责数码产品静态高清渲染、动态视觉渲染与电商全场景视觉输出，统一品牌视觉调性，适配日常运营及大促营销场景。',
  },
  {
    company: '深圳市芝麻电子科技有限公司',
    role: '视觉渲染设计师',
    time: '2022.05 - 2025.01',
    text: '负责数码电子产品与配件类产品静态渲染、电商平面设计、产品视觉包装、页面改版和品牌宣传物料设计。',
  },
  {
    company: '博跃芯动力科技有限公司',
    role: '电商视觉设计师',
    time: '2020.06 - 2022.03',
    text: '专注产品静态渲染、平面视觉设计、店铺视觉搭建、节日大促及活动专题页面设计，沉淀规范统一的店铺视觉体系。',
  },
]

const makeAssetFiles = (prefix, count, extension) =>
  Array.from({ length: count }, (_, index) => `/assets/${prefix}-${String(index + 1).padStart(2, '0')}.${extension}`)

const flatWhiteFiles = makeAssetFiles('flat-white', 24, 'webp')
const flatSceneFiles = makeAssetFiles('flat-scene', 46, 'webp')
const flatDetailFiles = makeAssetFiles('flat-detail', 5, 'jpg')

const makeFolderWorks = (files, category, categoryLabel, titlePrefix, text) =>
  files.map((image, index) => {
    const number = String(index + 1).padStart(2, '0')
    return {
      title: `${titlePrefix} ${number}`,
      slug: `${category}-${number}`,
      category,
      categoryLabel,
      image,
      text,
    }
  })

const whiteWorkGroups = [
  { title: '耳机', numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24] },
  { title: '香薰', numbers: [13, 14, 15, 16] },
]

const sceneWorkGroups = [
  { title: '耳机', numbers: [1, 2, 3, 8, 9, 12, 13, 14, 15, 16, 25, 26, 27, 28, 29, 30, 38, 39, 45, 46] },
  { title: '制氧机', numbers: [4, 5, 6, 7] },
  { title: '香薰', numbers: [10, 11, 20, 40, 41] },
  { title: '洗衣机', numbers: [17, 18, 19] },
  { title: '灯具', numbers: [21, 22, 23, 24, 31, 32, 33, 34, 35, 36, 37] },
  { title: '显示设备', numbers: [42, 43, 44] },
]

const classifyFlatWorks = (files, type, groups) =>
  files.map((image, index) => {
    const number = index + 1
    const group = groups.find((entry) => entry.numbers.includes(number))
    return {
      title: `${group.title}${type} ${String(number).padStart(2, '0')}`,
      slug: `${type === '白底图' ? 'white' : 'scene'}-${String(number).padStart(2, '0')}`,
      category: type === '白底图' ? 'white' : 'scene',
      categoryLabel: group.title,
      image,
      text: `${group.title}产品${type}。`,
    }
  })

const folderWhiteWorks = classifyFlatWorks(flatWhiteFiles, '白底图', whiteWorkGroups)
const folderSceneWorks = classifyFlatWorks(flatSceneFiles, '场景图', sceneWorkGroups)

const folderDetailWorks = makeFolderWorks(
  flatDetailFiles,
  'detail',
  '详情页',
  '详情页',
  '来自详情页文件夹的长图作品，用于展示电商页面的信息组织和视觉落地。'
)

const selectedWorks = [...folderWhiteWorks, ...folderSceneWorks, ...folderDetailWorks]

const workFilters = [
  { id: 'all', label: '全部' },
  { id: 'white', label: '白底图' },
  { id: 'scene', label: '场景图' },
  { id: 'detail', label: '详情页' },
]

const projectCategories = [
  {
    title: '耳机',
    label: 'Audio Product',
    slug: 'earphone',
    cover: '/assets/project-earphone-bc10-main-01.webp',
    description: '耳机白底图、产品主图与场景视觉。',
  },
  {
    title: '香薰',
    label: 'Aroma Visual',
    slug: 'aroma',
    cover: '/assets/project-aroma-160ml-main-01.webp',
    description: '车载香薰、香膏产品与氛围化商业画面。',
  },
  {
    title: '其他',
    label: 'Other Works',
    slug: 'other',
    cover: '/assets/flat-scene-08.webp',
    description: '制氧机、户外照明、海报与详情页作品。',
  },
]

const motionWorks = [
  {
    title: '发光耳机动态主片',
    slug: 'motion-glow-earphone',
    tag: 'Motion Render',
    video: '/assets/motion-glow-earphone.mp4',
    poster: '/assets/motion-poster-glow.webp',
    text: '以光效、产品转场和材质细节建立新品传播中的动态记忆点。',
  },
  {
    title: 'BC10 产品动画',
    slug: 'motion-bc10',
    tag: 'Product Film',
    video: '/assets/motion-bc10.mp4',
    poster: '/assets/motion-poster-bc10.webp',
    text: '面向电商与内容平台的产品动态展示，突出外观、佩戴和核心卖点。',
  },
  {
    title: 'I2 耳机动画',
    slug: 'motion-i2',
    tag: 'E-commerce Motion',
    video: '/assets/motion-i2.mp4',
    poster: '/assets/motion-poster-i2.webp',
    text: '通过简洁镜头语言呈现产品结构与系列感，适配详情页和短视频投放。',
  },
  {
    title: 'ZST 产品动画',
    slug: 'motion-zst',
    tag: 'Product Motion',
    video: '/assets/motion-zst.mp4',
    poster: '/assets/motion-poster-zst.webp',
    text: 'ZST 系列产品动态展示。',
  },
  {
    title: 'Dumpling Plus 产品动画',
    slug: 'motion-dumpling-plus',
    tag: 'Product Film',
    video: '/assets/motion-dumpling-plus.mp4',
    poster: '/assets/motion-poster-dumpling-plus.webp',
    text: 'Dumpling Plus 耳机的产品结构、声音与佩戴体验展示。',
  },
  {
    title: 'TB-X 产品动画',
    slug: 'motion-tbx',
    tag: 'Product Film',
    video: '/assets/motion-new-tbx.mp4',
    poster: '/assets/motion-poster-tbx.webp',
    text: '新增产品动画作品，补充产品动态展示与传播素材。',
  },
  {
    title: 'NC01 产品动画',
    slug: 'motion-en',
    tag: 'Motion Version',
    video: '/assets/motion-new-en.mp4',
    poster: '/assets/motion-poster-nc01.webp',
    text: '新增英文版动态作品，适合海外传播和多语言物料展示。',
  },
  {
    title: 'TB-PRO 产品动画',
    slug: 'motion-jp',
    tag: 'Motion Version',
    video: '/assets/motion-new-jp.mp4',
    poster: '/assets/motion-poster-tb-pro.webp',
    text: '新增日文版动态作品，补充不同市场版本的动画展示。',
  },
]

const strengths = [
  {
    icon: Cpu,
    title: '产品渲染表现',
    text: '熟悉数码电子产品材质、光影与结构表达，能将功能卖点转译为有质感的视觉画面。',
  },
  {
    icon: MonitorPlay,
    title: '动态视觉与 AI 设计',
    text: '能面向产品发布、广告素材和内容传播，完成动态渲染、视觉概念和 AI 辅助创意出图。',
  },
  {
    icon: Layers3,
    title: '电商全链路落地',
    text: '从视觉策划、渲染出图到详情页和活动物料交付，能独立推进完整项目。',
  },
  {
    icon: Boxes,
    title: '品牌一致性',
    text: '长期服务深圳数码科技行业，理解品牌调性、平台规范和用户审美之间的平衡。',
  },
]

const heroSkills = ['C4D', 'Ps', 'Ai', 'Ae', 'AIGC']

const toolIcons = [
  { name: 'C4D', label: 'Cinema 4D' },
  { name: 'Ps', label: 'Photoshop' },
  { name: 'Ai', label: 'Illustrator' },
  { name: 'Ae', label: 'After Effects' },
  { name: 'AIGC', label: 'AI Workflow' },
]

const galleryItems = [28, 17, 38, 42, 30, 45, 18, 43, 39].map((number) => {
  const work = folderSceneWorks[number - 1]
  return { image: work.image, label: work.title, slug: work.slug }
})

const workPages = [
  ...selectedWorks.map((work) => ({
    ...work,
    type: 'image',
    tag: work.categoryLabel,
    media: work.image,
  })),
  ...motionWorks.map((work) => ({
    ...work,
    type: 'video',
    categoryLabel: '动画作品',
    media: work.video,
    image: work.poster,
  })),
]

const makeProjectImage = (source, index) => ({
  ...source,
  id: `${source.image || source.video}-${index}`,
  type: source.type || 'image',
})

const makeSceneItems = (numbers, titlePrefix) =>
  numbers.map((number) => ({
    title: `${titlePrefix} ${String(number).padStart(2, '0')}`,
    label: '主图',
    image: `/assets/flat-scene-${String(number).padStart(2, '0')}.webp`,
  }))

const makeWhiteItems = (numbers, titlePrefix = '白底图') =>
  numbers.map((number) => ({
    title: `${titlePrefix} ${String(number).padStart(2, '0')}`,
    label: '白底图',
    image: `/assets/flat-white-${String(number).padStart(2, '0')}.webp`,
  }))

const makeProjectSection = (title, label, works) => ({
  title,
  label,
  works: works.map(makeProjectImage),
})

const makeProductItems = (prefix, count, titlePrefix, label = '产品图') =>
  Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, '0')
    return {
      title: `${titlePrefix} ${number}`,
      label,
      image: `/assets/${prefix}-${number}.webp`,
    }
  })

const makeProductSections = (prefix, mainCount, detailHeight, titlePrefix, detailImage = `/assets/${prefix}-detail-01.jpg`, whiteIndices = [mainCount - 1]) => {
  const mainWorks = makeProductItems(`${prefix}-main`, mainCount, `${titlePrefix}主图`, '主图')
  const whiteIndexSet = new Set(whiteIndices)
  const orderedMainWorks = [
    ...whiteIndices.map((index) => ({ ...mainWorks[index], label: '白底图' })),
    ...mainWorks.filter((_, index) => !whiteIndexSet.has(index)),
  ].map((work, index) => ({
    ...work,
    title: `${titlePrefix}${work.label === '白底图' ? '白底图' : '主图'} ${String(index + 1).padStart(2, '0')}`,
  }))
  const sections = [
    makeProjectSection('主图', 'Main Visuals', orderedMainWorks),
  ]

  if (detailHeight > 0) {
    sections.push({
      title: '详情页',
      label: 'Detail Page',
      image: detailImage,
      imageWidth: 790,
      imageHeight: detailHeight,
      variant: 'detailColumns',
    })
  }

  return sections
}

const aromaProducts = [
  {
    title: '160ml',
    label: '160ml Aroma',
    slug: '160ml',
    cover: '/assets/project-aroma-160ml-main-01.webp',
    description: '160ml 香薰产品主图与详情页。',
    sections: makeProductSections('project-aroma-160ml', 6, 35307, '160ml 香薰'),
  },
  {
    title: '车载香膏',
    label: 'Car Balm',
    slug: 'car-balm',
    cover: '/assets/project-aroma-car-balm-main-01.webp',
    description: '车载香膏产品主图与详情页。',
    sections: makeProductSections('project-aroma-car-balm', 5, 27348, '车载香膏'),
  },
  {
    title: '室内香薰',
    label: 'Indoor Aroma',
    slug: 'indoor',
    cover: '/assets/project-aroma-indoor-main-01.webp',
    description: '室内香薰产品主图与详情页。',
    sections: makeProductSections('project-aroma-indoor', 5, 22515, '室内香薰'),
  },
  {
    title: '香砖',
    label: 'Aroma Block',
    slug: 'xiang',
    cover: '/assets/project-aroma-xiang-main-04.webp',
    description: '香砖产品白底图、场景主图与详情页。',
    sections: makeProductSections('project-aroma-xiang', 8, 23400, '香砖', '/assets/project-aroma-xiang-detail-01.jpg', [0, 1, 2]),
  },
]

const makeEarphoneProduct = (title, slug, mainCount, detailCount) => {
  const prefix = `project-earphone-${slug}`
  const mainWorks = makeProductItems(`${prefix}-main`, mainCount, `${title}主图`, '主图')
  const whiteWork = (image) => ({ label: '白底图', image })
  const whiteFromMain = (work) => ({ ...work, label: '白底图' })
  const orderedMainWorks = {
    bc10: [whiteFromMain(mainWorks[0]), whiteFromMain(mainWorks[12]), mainWorks[11], ...mainWorks.slice(1, 11)],
    i2: [...mainWorks.slice(6).map(whiteFromMain), ...mainWorks.slice(0, 6)],
    nc01: [whiteWork('/assets/project-earphone-nc01-white.png'), ...mainWorks],
    glow: [whiteWork('/assets/project-earphone-glow-white.png'), ...mainWorks],
    wukong: [
      whiteWork('/assets/project-earphone-wukong-white-01.jpg'),
      whiteWork('/assets/project-earphone-wukong-white-02.jpg'),
      whiteWork('/assets/project-earphone-wukong-white-03.webp'),
      whiteWork('/assets/project-earphone-wukong-white-04.webp'),
      whiteWork('/assets/project-earphone-wukong-white-05.webp'),
      ...mainWorks,
    ],
    dumpling: [
      ...[0, 1, 2, 3].map((index) => whiteFromMain(mainWorks[index])),
      ...[4, 9, 11, 12, 13].map((index) => mainWorks[index]),
    ],
  }[slug] || mainWorks
  const numberedMainWorks = orderedMainWorks.map((work, index) => ({
    ...work,
    title: `${title}${work.label === '白底图' ? '白底图' : '主图'} ${String(index + 1).padStart(2, '0')}`,
  }))
  const sections = [
    makeProjectSection('主图', 'Main Visuals', numberedMainWorks),
  ]

  if (detailCount) {
    const detailPrefix = slug === 'i2' ? 'project-earphone-i2-aplus-v3' : `${prefix}-detail`
    const detailWorks = makeProductItems(detailPrefix, detailCount, `${title} A+`, 'A+')
    const splitWorks = slug === 'glow'
      ? Array.from({ length: 7 }, (_, index) => ({
          ...detailWorks[0],
          title: `${title} A+ ${String(index + 1).padStart(2, '0')}`,
          cropIndex: index,
          cropCount: 7,
        }))
      : slug === 'dumpling'
        ? [
            { ...detailWorks[0], title: `${title} A+ 01 上`, cropIndex: 0, cropCount: 2 },
            { ...detailWorks[0], title: `${title} A+ 01 下`, cropIndex: 1, cropCount: 2 },
            ...detailWorks.slice(1),
          ]
        : null
    sections.push(splitWorks
      ? { ...makeProjectSection('A+', 'A+ Visuals', splitWorks), variant: 'splitAPlus' }
      : makeProjectSection('A+', 'A+ Visuals', detailWorks))
  }
  return {
    title,
    label: 'Earphone Product',
    slug,
    cover: `/assets/${prefix}-main-01.webp`,
    description: `${title} 耳机的产品主图${detailCount ? '、A+ 页面' : ''}。`,
    sections,
  }
}

const earphoneProducts = [
  { ...makeEarphoneProduct('I2', 'i2', 8, 7), group: 'featured' },
  { ...makeEarphoneProduct('发光耳机', 'glow', 6, 1), group: 'featured' },
  { ...makeEarphoneProduct('水饺', 'dumpling', 17, 7), cover: '/assets/project-earphone-dumpling-main-05.webp', group: 'featured' },
  { ...makeEarphoneProduct('NC01', 'nc01', 10, 6), group: 'featured' },
  { ...makeEarphoneProduct('BC10', 'bc10', 13, 0), group: 'featured' },
  { ...makeEarphoneProduct('悟空', 'wukong', 8, 6), group: 'featured' },
  {
    title: '其他耳机作品',
    label: 'Other Earphones',
    slug: 'other-earphones',
    group: 'other',
    cover: '/assets/project-earphone-render-01-clean.webp',
    description: '其他耳机型号的白底图、产品主图与场景视觉。',
    sections: [
      makeProjectSection('主图', 'Main Visuals', [
        ...makeWhiteItems([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21, 22, 23, 24], '耳机白底图'),
        ...makeWhiteItems([18], '耳机配件白底图'),
        ...[1, 2, 3].map((number) => ({
          title: `耳机白底图 新增 ${String(number).padStart(2, '0')}`,
          label: '白底图',
          image: `/assets/project-earphone-other-white-${String(number).padStart(2, '0')}.webp`,
        })),
        ...[1, 2].map((number) => ({
          title: `耳机配件白底图 新增 ${String(number).padStart(2, '0')}`,
          label: '白底图',
          image: `/assets/project-earphone-other-white-amp-${String(number).padStart(2, '0')}.webp`,
        })),
        ...makeWhiteItems([1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13], '耳机主图').map((work) => ({
          ...work,
          label: '主图',
          image: work.image.replace('/assets/flat-white-', '/assets/project-earphone-render-').replace(/render-(0[1-3])\.webp$/, 'render-$1-clean.webp'),
        })),
        ...makeSceneItems([9, 29], '耳机场景图'),
        ...makeSceneItems([8, 46], '耳机配件场景图'),
      ]),
    ],
  },
]

const oxygenProducts = [{
  title: '便携制氧机',
  label: 'Portable Oxygen System',
  slug: 'portable',
  cover: '/assets/flat-scene-04.webp',
  description: '便携制氧机的宣传海报与产品详情页。',
  sections: [
    makeProjectSection('海报', 'Posters', makeSceneItems([4, 5, 6, 7], '制氧机海报')),
    {
      title: '详情页', label: 'Detail Page', variant: 'detailColumns',
      image: '/assets/flat-detail-03.jpg', imageWidth: 998, imageHeight: 36000,
    },
  ],
}]

const lightingProducts = [
  {
    title: '户外泛光灯',
    label: 'Outdoor Lighting',
    slug: 'outdoor',
    cover: '/assets/project-lighting-outdoor-main-02.webp',
    description: '户外泛光灯的产品主图与电脑端、手机端 A+ 设计。',
    sections: [
      makeProjectSection('主图', 'Main Visuals', makeProductItems('project-lighting-outdoor-main', 7, '户外泛光灯主图')),
      makeProjectSection('A+', 'Desktop A+ Visuals', makeProductItems('project-lighting-outdoor-aplus-desktop', 7, '户外泛光灯 A+')),
      { ...makeProjectSection('手机端 A+', 'Mobile A+ Visuals', makeProductItems('project-lighting-outdoor-aplus-mobile', 7, '户外泛光灯手机端 A+')), variant: 'aPlus' },
    ],
  },
]

const otherProducts = [
  {
    title: '灯光设计方案', label: 'Lighting Design', slug: 'lighting-design',
    cover: '/assets/project-lighting-design-main-02.webp',
    description: '全屋灯光设计方案、空间效果与服务流程展示。',
    sections: [
      makeProjectSection('方案预览', 'Design Proposal', makeProductItems('project-lighting-design-main', 5, '灯光设计方案')),
      {
        title: '详情页', label: 'Detail Page', variant: 'detailColumns',
        image: '/assets/project-lighting-design-detail-01.jpg', imageWidth: 790, imageHeight: 18802,
      },
    ],
  },
  {
    title: '海报', label: 'Campaign Posters', slug: 'posters',
    cover: '/assets/flat-scene-22.webp',
    description: '室内灯具、洗衣机、显示设备与耳机的宣传海报。',
    sections: [{
      title: '海报', label: 'Posters', variant: 'posterGroups',
      groups: [
        makeProjectSection('室内灯具', 'Interior Lighting', makeSceneItems([22, 23, 24], '室内灯具海报')),
        makeProjectSection('洗衣机', 'Laundry', makeSceneItems([17, 18, 19], '洗衣机海报')),
        makeProjectSection('显示设备', 'Displays', makeSceneItems([42, 43, 44], '显示设备海报')),
        makeProjectSection('耳机', 'Earphone Posters', makeSceneItems([13, 14, 15], '耳机海报')),
      ],
    }],
  },
  {
    title: '行车记录仪', label: 'Dash Camera', slug: 'dash-camera',
    cover: '/assets/flat-detail-04-slice-01.jpg', description: '行车记录仪详情页设计。',
    sections: [{
      title: '详情页', label: 'Detail Page', variant: 'detailColumns',
      image: '/assets/flat-detail-04.jpg', imageWidth: 790, imageHeight: 25417,
    }],
  },
]

const subProjectsByCategory = {
  aroma: aromaProducts,
  earphone: earphoneProducts,
  other: [...oxygenProducts, ...lightingProducts, ...otherProducts],
}

const projectPages = projectCategories.map((project) => ({
  ...project,
  subProjects: subProjectsByCategory[project.slug],
}))

const projectEntries = projectPages.flatMap((parent) =>
  parent.subProjects.map((product) => ({ parent, product })),
)

const RETURN_POSITION_KEY = 'keysonPortfolioReturnPosition'
const PROJECT_FILTER_KEY = 'keysonPortfolioProjectFilter'
const legacyProductRoutes = {
  '#project/other/accessories': '#project/earphone/other-earphones',
  '#project/other/indoor-lighting': '#project/other/posters',
  '#project/other/appliances': '#project/other/posters',
  '#project/other/displays': '#project/other/posters',
}

function useResponsiveColumnCount() {
  const getCount = () => {
    if (window.innerWidth <= 760) return 1
    if (window.innerWidth <= 1180) return 2
    return 4
  }

  const [columnCount, setColumnCount] = useState(getCount)

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getCount())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return columnCount
}

function getWorkVisualWeight(work) {
  if (work.category === 'detail') return 1.72
  if (work.category === 'white') return 1.06
  return 1 + (Number(work.slug.match(/\d+$/)?.[0] || 0) % 4) * 0.18
}

function makeMasonryColumns(works, columnCount) {
  const columns = Array.from({ length: columnCount }, () => [])
  const heights = Array.from({ length: columnCount }, () => 0)

  works.forEach((work, index) => {
    const targetIndex = index < columnCount ? index : heights.indexOf(Math.min(...heights))
    columns[targetIndex].push(work)
    heights[targetIndex] += getWorkVisualWeight(work)
  })

  return columns
}

function saveReturnPosition(fallbackHash, preferFallback = false) {
  sessionStorage.setItem(
    RETURN_POSITION_KEY,
    JSON.stringify({
      hash: preferFallback
        ? fallbackHash
        : window.location.hash && !window.location.hash.startsWith('#work/')
          ? window.location.hash
          : fallbackHash,
      y: window.scrollY,
    }),
  )
}

function hasReturnPositionForCurrentHash() {
  try {
    const raw = sessionStorage.getItem(RETURN_POSITION_KEY)
    if (!raw) return false
    const position = JSON.parse(raw)
    return position.hash === window.location.hash
  } catch {
    sessionStorage.removeItem(RETURN_POSITION_KEY)
    return false
  }
}

function App() {
  const activeWork = useActiveWork()
  const activeProjectProduct = useActiveProjectProduct()
  const activeProject = useActiveProject()
  const [lightboxWork, setLightboxWork] = useState(null)
  const routeKey = activeWork
    ? `work-${activeWork.slug}`
    : activeProjectProduct
      ? `product-${activeProjectProduct.parent.slug}-${activeProjectProduct.product.slug}`
      : activeProject
      ? `project-${activeProject.slug}`
      : `main-${window.location.hash || '#home'}`
  useScrollReveal(routeKey)
  useReturnPosition(routeKey)

  if (activeProjectProduct) {
    return (
      <main>
        <Navigation />
        <ProjectProductDetail parent={activeProjectProduct.parent} product={activeProjectProduct.product} />
      </main>
    )
  }

  if (activeProject) {
    return (
      <main>
        <Navigation />
        <ProjectDetail project={activeProject} />
      </main>
    )
  }

  if (activeWork?.type === 'video') {
    return (
      <main>
        <Navigation />
        <WorkDetail work={activeWork} />
      </main>
    )
  }

  return (
    <main>
      <Navigation />
      <Hero onOpenWork={setLightboxWork} />
      <About />
      <Projects />
      <MotionProjects />
      <Strengths />
      <Contact />
      <MediaLightbox work={lightboxWork} onClose={() => setLightboxWork(null)} />
    </main>
  )
}

function useActiveWork() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const match = hash.match(/^#work\/(.+)$/)
  if (!match) return null

  return workPages.find((work) => work.slug === decodeURIComponent(match[1])) || null
}

function useActiveProject() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const match = hash.match(/^#project\/([^/]+)$/)
  if (!match) return null

  const slug = decodeURIComponent(match[1])
  return projectPages.find((project) => project.slug === (slug === 'oxygen' || slug === 'lighting' ? 'other' : slug)) || null
}

function useActiveProjectProduct() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (legacyProductRoutes[hash]) {
      window.history.replaceState(null, '', legacyProductRoutes[hash])
    }
  }, [hash])

  const normalizedHash = legacyProductRoutes[hash] || hash
  const match = normalizedHash.match(/^#project\/([^/]+)\/([^/]+)$/)
  if (!match) return null

  const slug = decodeURIComponent(match[1])
  const parent = projectPages.find((project) => project.slug === (slug === 'oxygen' || slug === 'lighting' ? 'other' : slug))
  const product = parent?.subProjects?.find((item) => item.slug === decodeURIComponent(match[2]))

  return parent && product ? { parent, product } : null
}

function useReturnPosition(routeKey) {
  useEffect(() => {
    const raw = sessionStorage.getItem(RETURN_POSITION_KEY)
    if (!raw) {
      if (window.location.hash === '#motion') {
        window.setTimeout(() => document.getElementById('motion')?.scrollIntoView({ behavior: 'auto' }), 0)
      }
      return
    }

    try {
      const position = JSON.parse(raw)
      if (position.hash !== window.location.hash) return

      sessionStorage.removeItem(RETURN_POSITION_KEY)
      window.setTimeout(() => {
        window.scrollTo({ top: position.y || 0, behavior: 'auto' })
      }, 0)
    } catch {
      sessionStorage.removeItem(RETURN_POSITION_KEY)
    }
  }, [routeKey])
}

function useScrollReveal(routeKey) {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal')

    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('isVisible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('isVisible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )

    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [routeKey])
}

function Navigation() {
  return (
    <nav className="nav shell" aria-label="主导航">
      <a className="brand" href="#home">
        <span>KEYSON</span>
        <small>VISUAL DESIGN</small>
      </a>
      <div className="navLinks">
        <a href="#about">经历</a>
        <a href="#projects">项目</a>
        <a href="#motion">动画</a>
        <a href="#strengths">优势</a>
      </div>
      <a className="navContact" href={`mailto:${profile.email}`}>
        <Mail size={17} />
        联系我
      </a>
    </nav>
  )
}

function Hero({ onOpenWork }) {
  return (
    <section className="hero" id="home">
      <video className="heroVideo" src="/assets/hero-abstract-blue.mp4" autoPlay muted loop playsInline poster="/assets/project-render.webp" />
      <div className="heroShade" />
      <div className="heroInner shell">
        <p className="heroEyebrow">{profile.name} · {profile.alias}</p>
        <div className="heroTitle" aria-label="Portfolio"><span>PORT</span><span>FOLIO</span></div>
        <div className="heroSkills" aria-label="核心能力">
          {heroSkills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
        <div className="heroStage reveal">
          <aside className="heroIntro" aria-label="个人简介">
            <span className="introLine" />
            <p>{profile.roles}<br />以 3D 渲染、AI 工作流与品牌视觉系统，为数码产品建立更有质感与识别度的商业表达。</p>
            <a className="introAction" href="#projects">查看作品 <ArrowUpRight size={17} /></a>
          </aside>
          <div className="heroVisual" aria-label="3D 人物主视觉">
            <div className="toolOrbit" aria-label="设计工具">
              {toolIcons.map((tool, index) => (
                <span className={`toolIcon toolIcon${index + 1}`} key={tool.name}><strong>{tool.name}</strong><small>{tool.label}</small></span>
              ))}
            </div>
            <img src="/assets/keyson-comic-clean.webp" alt="Keyson 漫画 3D 人物主视觉" decoding="async" fetchPriority="high" />
          </div>
          <aside className="heroStats" aria-label="项目数据">
            <div><strong>6+</strong><span>年渲染视觉设计经验</span></div>
            <div><strong>多品类</strong><span>消费电子与个护项目</span></div>
          </aside>
        </div>
      </div>
      <ArcGallery items={galleryItems} onOpenWork={onOpenWork} />
    </section>
  )
}

function ArcGallery({ items, onOpenWork }) {
  const galleryRef = useRef(null)
  const pausedRef = useRef(false)
  const progressRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    let frameId
    const gallery = galleryRef.current
    const pause = () => {
      pausedRef.current = true
    }
    const resume = (event) => {
      if (event?.relatedTarget && gallery?.contains(event.relatedTarget)) return
      pausedRef.current = false
      lastTimeRef.current = 0
    }
    const syncPointer = (event) => {
      const gallery = galleryRef.current
      if (!gallery) return

      const rect = gallery.getBoundingClientRect()
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom

      pausedRef.current = isInside
      if (!isInside) lastTimeRef.current = 0
    }

    gallery?.addEventListener('pointerenter', pause)
    gallery?.addEventListener('pointerover', pause)
    gallery?.addEventListener('mouseenter', pause)
    gallery?.addEventListener('mouseover', pause)
    gallery?.addEventListener('pointerleave', resume)
    gallery?.addEventListener('pointerout', resume)
    gallery?.addEventListener('mouseleave', resume)
    gallery?.addEventListener('mouseout', resume)
    window.addEventListener('pointermove', syncPointer)
    window.addEventListener('mousemove', syncPointer)

    const animate = (time) => {
      const gallery = galleryRef.current
      if (gallery) {
        const isPaused = pausedRef.current || gallery.matches(':hover')

        if (!isPaused) {
          if (lastTimeRef.current) {
            progressRef.current = (progressRef.current + (time - lastTimeRef.current) * 0.000028) % 1
          }
          lastTimeRef.current = time
        } else {
          lastTimeRef.current = 0
        }

        const width = gallery.clientWidth
        const isMobile = width < 720
        const arcWidth = width * (isMobile ? 1.08 : 0.86)
        const arcHeight = isMobile ? 18 : 26
        const progressBase = progressRef.current

        gallery.querySelectorAll('.arcCard').forEach((card, index) => {
          const progress = (progressBase + index / items.length) % 1
          const angle = progress * Math.PI
          const x = (progress - 0.5) * arcWidth
          const lift = Math.sin(angle)
          const y = -lift * arcHeight
          const scale = 0.74 + lift * 0.22
          const fadeIn = Math.min(1, progress / 0.18)
          const fadeOut = Math.min(1, (1 - progress) / 0.18)
          const edgeFade = Math.min(fadeIn, fadeOut)
          const smoothFade = edgeFade * edgeFade * (3 - 2 * edgeFade)
          const opacity = (0.34 + lift * 0.62) * smoothFade
          const rotate = (progress - 0.5) * (isMobile ? 12 : 18)
          const depth = Math.round(10 + lift * 40)

          card.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`
          card.style.opacity = opacity.toFixed(3)
          card.style.zIndex = String(depth)
          card.style.pointerEvents = opacity < 0.08 ? 'none' : 'auto'
        })
      }

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frameId)
      gallery?.removeEventListener('pointerenter', pause)
      gallery?.removeEventListener('pointerover', pause)
      gallery?.removeEventListener('mouseenter', pause)
      gallery?.removeEventListener('mouseover', pause)
      gallery?.removeEventListener('pointerleave', resume)
      gallery?.removeEventListener('pointerout', resume)
      gallery?.removeEventListener('mouseleave', resume)
      gallery?.removeEventListener('mouseout', resume)
      window.removeEventListener('pointermove', syncPointer)
      window.removeEventListener('mousemove', syncPointer)
    }
  }, [items])

  return (
    <div className="arcGallery" ref={galleryRef} aria-label="作品弧形画廊">
      <div className="arcGuide" />
      {items.map((item, index) => (
        <button
          type="button"
          className="arcCard"
          key={`${item.label}-${index}`}
          onClick={() => {
            onOpenWork(selectedWorks.find((selectedWork) => selectedWork.slug === item.slug))
          }}
        >
          <img src={item.image} alt={item.label} loading="lazy" decoding="async" />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="shell aboutHeader reveal">
        <div>
          <h2>
            WORK EXPERIENCE
            <ArrowUpRight size={34} />
          </h2>
          <p>个人经历</p>
        </div>
      </div>

      <div className="shell aboutGrid reveal">
        <div className="portraitWrap">
          <img src="/assets/keyson-avatar.webp" alt="Keyson 个人头像插画" loading="lazy" decoding="async" />
        </div>
        <div className="aboutContent">
          <p className="sectionKicker">About Me</p>
          <h2>
            Hi, I am <span className="titleAccent">Keyson!</span>
          </h2>
          <p>
            我具备多年数码电商视觉与渲染实战经验，擅长把产品结构、材质细节和品牌调性转化为清晰的商业画面。熟悉静态渲染、动态视觉、AI 辅助创意与电商页面落地。
          </p>
          <div className="aboutInfoGrid">
            <div>
              <span>当前身份</span>
              <strong>{profile.roles}</strong>
            </div>
            <div>
              <span>服务方向</span>
              <strong>Graphic Design / 3D / AIGC</strong>
            </div>
            <div>
              <span>手机</span>
              <strong>{profile.phone}</strong>
            </div>
            <div>
              <span>邮箱</span>
              <strong>{profile.email}</strong>
            </div>
          </div>
          <div className="metrics">
            {metrics.map((item) => (
              <div className="metric" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="aboutTags" aria-label="正在构建">
            <span>NOW BUILDING</span>
            <em>品牌视觉系统</em>
            <em>AIGC 视觉工作流</em>
            <em>电商营销视觉</em>
          </div>
        </div>
      </div>
      <div className="shell timeline reveal">
        <div className="timelineTitle">
          <span>CAREER PATH</span>
          <strong>工作经历</strong>
        </div>
        {experiences.map((item) => (
          <article className="experience" key={item.company}>
            <div>
              <span>{item.time}</span>
              <h3>{item.company}</h3>
            </div>
            <div>
              <strong>{item.role}</strong>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState(() => {
    const savedFilter = sessionStorage.getItem(PROJECT_FILTER_KEY)
    return projectCategories.some((project) => project.slug === savedFilter)
      ? savedFilter
      : projectCategories[0].slug
  })
  const visibleProjects = projectEntries.filter(({ parent }) => parent.slug === activeFilter)
  const activeCategory = projectCategories.find((category) => category.slug === activeFilter)

  return (
    <section className="section projects" id="projects">
      <div className="shell projectListBoard reveal">
        <div className="projectListHead">
          <div>
            <p className="sectionKicker">Portfolio / 作品目录</p>
            <h2>Selected Works</h2>
            <p className="projectListContext">{activeCategory.description}</p>
          </div>
          <div className="projectFilters" role="group" aria-label="筛选项目">
            {projectCategories.map((filter) => (
              <button
                type="button"
                key={filter.slug}
                className={activeFilter === filter.slug ? 'isActive' : ''}
                aria-pressed={activeFilter === filter.slug}
                onClick={() => {
                  sessionStorage.setItem(PROJECT_FILTER_KEY, filter.slug)
                  setActiveFilter(filter.slug)
                }}
              >
                {filter.title}
              </button>
            ))}
          </div>
        </div>
        <div className="projectListRows" aria-label="项目列表">
          {visibleProjects.map(({ parent, product }, index) => (
            <a
              className="projectListRow"
              href={`#project/${parent.slug}/${product.slug}`}
              key={`${parent.slug}/${product.slug}`}
              onClick={() => saveReturnPosition('#projects', true)}
            >
              <span className="projectListNumber">{String(index + 1).padStart(2, '0')}</span>
              <div className="projectListInfo">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
              <span className="projectListTag">{parent.title}</span>
              <div className="projectListThumb">
                <img src={product.cover} alt="" loading="lazy" decoding="async" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function MotionProjects() {
  return (
    <section className="section motionProjects" id="motion">
      <div className="shell reveal">
        <div className="motionProjectsHead">
          <div>
            <p className="sectionKicker">Motion / 动态作品</p>
            <h2>动画作品</h2>
          </div>
          <p>产品在镜头中的另一种表达。选择项目查看完整视频。</p>
        </div>
        <div className="motionProjectsGrid">
          {motionWorks.map((work) => (
            <a
              className="motionProjectCard"
              href={`#work/${work.slug}`}
              key={work.slug}
              onClick={() => saveReturnPosition('#motion', true)}
            >
              <div className="motionProjectPoster">
                <img src={work.poster} alt="" loading="lazy" decoding="async" />
                <span className="motionProjectPlay" aria-hidden="true">▶</span>
              </div>
              <div className="motionProjectInfo">
                <div><h3>{work.title}</h3><p>{work.tag}</p></div>
                <ArrowUpRight size={20} aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectDetail({ project }) {
  useEffect(() => {
    if (hasReturnPositionForCurrentHash()) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [project.slug])

  const handleBack = (event) => {
    event.preventDefault()

    let targetHash = '#projects'
    try {
      const raw = sessionStorage.getItem(RETURN_POSITION_KEY)
      if (raw) {
        const position = JSON.parse(raw)
        targetHash = position.hash || targetHash
      }
    } catch {
      sessionStorage.removeItem(RETURN_POSITION_KEY)
    }

    window.location.hash = targetHash
  }

  return (
    <section className="projectDetailPage">
      <div className="shell projectDetailShell reveal isVisible">
        <a className="detailBack" href="#projects" onClick={handleBack}>
          返回项目
          <ArrowUpRight size={18} />
        </a>
        <header className="projectDetailHero">
          <div>
            <p className="sectionKicker">Project Case</p>
            <h1>{project.title}</h1>
            <span>{project.label}</span>
          </div>
          <p>{project.description}</p>
        </header>
        <ProjectSubProjectGrid project={project} />
      </div>
    </section>
  )
}

function ProjectSubProjectGrid({ project }) {
  if (project.slug === 'earphone') {
    return (
      <div className="projectSubGroups">
        <section className="projectSubGroup">
          <div className="projectSubGroupHead">
            <h2>精选型号</h2>
            <p>主图、视觉页面与产品动画</p>
          </div>
          <ProjectSubCards project={project} items={project.subProjects.filter((item) => item.group === 'featured')} className="projectSubGrid--featured" />
        </section>
        <section className="projectSubGroup">
          <div className="projectSubGroupHead">
            <h2>其他耳机作品</h2>
            <p>更多耳机产品主图</p>
          </div>
          <ProjectSubCards project={project} items={project.subProjects.filter((item) => item.group === 'other')} className="projectSubGrid--three" />
        </section>
      </div>
    )
  }

  return <ProjectSubCards project={project} items={project.subProjects} className={project.slug === 'other' ? 'projectSubGrid--three' : ''} />
}

function ProjectSubCards({ project, items, className = '' }) {
  return (
    <div className={`projectSubGrid ${className}`} aria-label={`${project.title}项目列表`}>
      {items.map((item) => (
        <a
          className="projectSubCard"
          href={`#project/${project.slug}/${item.slug}`}
          key={item.slug}
          onClick={() => saveReturnPosition(`#project/${project.slug}`)}
        >
          <div className="projectSubPlaceholder">
            <img src={item.cover} alt={`${item.title}代表作品`} loading="lazy" decoding="async" />
          </div>
          <div className="projectSubMeta">
            <h2>{item.title}</h2>
            <p>{item.label}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

function ProjectProductDetail({ parent, product }) {
  useEffect(() => {
    if (hasReturnPositionForCurrentHash()) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [parent.slug, product.slug])

  let backHash = `#project/${parent.slug}`
  try {
    if (JSON.parse(sessionStorage.getItem(RETURN_POSITION_KEY) || 'null')?.hash === '#projects') {
      backHash = '#projects'
    }
  } catch {
    sessionStorage.removeItem(RETURN_POSITION_KEY)
  }

  const handleBack = (event) => {
    event.preventDefault()
    window.location.hash = backHash
  }

  return (
    <section className="projectDetailPage">
      <div className="shell projectDetailShell reveal isVisible">
        <a className="detailBack" href={backHash} onClick={handleBack}>
          {backHash === '#projects' ? '返回项目' : `返回${parent.title}`}
          <ArrowUpRight size={18} />
        </a>
        <header className={`projectDetailHero${product.slug === 'lighting-design' ? ' isCompactTitle' : ''}`}>
          <div>
            <p className="sectionKicker">{parent.title}项目</p>
            <h1>{product.title}</h1>
            <span>{product.label}</span>
          </div>
          <p>{product.description}</p>
        </header>
        <div className="projectSectionStack">
          {product.sections.map((section) => (
            <section className="projectWorkSection" key={section.title}>
              <div className="projectWorkSectionHead">
                <h2>{section.title}</h2>
                <span>{section.label}</span>
              </div>
              {section.variant === 'detailColumns' ? (
                <ProjectDetailColumns image={section.image} imageWidth={section.imageWidth} imageHeight={section.imageHeight} label={`${product.title}详情页`} />
              ) : section.variant === 'posterGroups' ? (
                <div className="projectPosterGroups">
                  {section.groups.map((group) => (
                    <div className="projectPosterGroup" key={group.title}>
                      <h3>{group.title}</h3>
                      <ProjectAPlusGallery works={group.works} label={`${group.title}海报`} />
                    </div>
                  ))}
                </div>
              ) : section.title === '海报' ? (
                <div className="projectPosterGallery">
                  <ProjectAPlusGallery works={section.works} label={`${product.title}海报`} />
                </div>
              ) : section.title === 'A+' || section.variant === 'aPlus' ? (
                section.variant === 'splitAPlus'
                  ? <ProjectSplitAPlusGallery works={section.works} label={`${product.title} A+ 作品`} />
                  : <ProjectAPlusGallery works={section.works} label={`${product.title} A+ 作品`} />
              ) : (
                <ProjectCaseGrid
                  works={section.works}
                  label={`${product.title}${section.title}列表`}
                  mainGrid={section.title === '主图' && product.slug !== 'other-earphones'}
                />
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectAPlusGallery({ works, label }) {
  return (
    <div className="projectAPlusGallery" aria-label={label}>
      {works.map((work) => (
        <img src={work.image} alt={work.title} key={work.id} loading="lazy" decoding="async" />
      ))}
    </div>
  )
}

function ProjectSplitAPlusGallery({ works, label }) {
  return (
    <div className="projectSplitAPlusGallery" aria-label={label}>
      {works.map((work) => {
        const cropCount = work.cropCount || 1
        return (
          <div
            className="projectSplitAPlusPanel"
            role="img"
            aria-label={work.title}
            key={work.id}
            style={{
              backgroundImage: `url(${work.image})`,
              backgroundSize: `100% ${cropCount * 100}%`,
              backgroundPosition: `center ${cropCount === 1 ? 0 : work.cropIndex * 100 / (cropCount - 1)}%`,
            }}
          />
        )
      })}
    </div>
  )
}

function ProjectDetailColumns({ image, imageWidth = 790, imageHeight, label }) {
  return (
    <div className="projectDetailColumns" aria-label={label}>
      {Array.from({ length: 4 }, (_, index) => (
        <div
          className="projectDetailColumn"
          role="img"
          aria-label={`${label}第 ${index + 1} 段`}
          key={index}
          style={{
            aspectRatio: `${imageWidth * 4} / ${imageHeight}`,
            backgroundImage: `url(${image})`,
            backgroundPosition: `center ${index * 100 / 3}%`,
          }}
        />
      ))}
    </div>
  )
}

function ProjectCaseGrid({ works, label, mainGrid = false }) {
  return (
    <div className={`projectCaseMasonry ${mainGrid ? 'isMainGrid' : ''}`} aria-label={label}>
      {works.map((work) => (
        <article className={`projectCaseCard ${work.variant === 'detail' ? 'isDetail' : ''}`} key={work.id}>
          {work.type === 'video' ? (
            <video src={work.video} poster={work.image} controls muted loop playsInline preload="metadata" />
          ) : (
            <img src={work.image} alt={work.title} loading="lazy" decoding="async" />
          )}
        </article>
      ))}
    </div>
  )
}

function formatVideoTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const value = Math.floor(seconds)
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`
}

function MotionVideoPlayer({ work }) {
  const videoRef = useRef(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const seekTo = (event) => {
    const nextTime = Number(event.currentTarget.value)
    if (!Number.isFinite(nextTime)) return
    setCurrentTime(nextTime)
    if (videoRef.current?.readyState >= 1) videoRef.current.currentTime = nextTime
  }

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  return (
    <>
      <video
        ref={videoRef}
        src={work.media}
        poster={work.image}
        controls
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="videoSeekControls">
        <button type="button" onClick={togglePlayback} aria-label={isPlaying ? '暂停视频' : '播放视频'}>
          {isPlaying ? '暂停' : '播放'}
        </button>
        <span>{formatVideoTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 1}
          step="0.1"
          value={Math.min(currentTime, duration || 1)}
          onChange={seekTo}
          disabled={!duration}
          aria-label="拖动视频播放进度"
        />
        <span>{formatVideoTime(duration)}</span>
      </div>
    </>
  )
}

function WorkDetail({ work }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [work.slug])

  const handleBack = (event) => {
    event.preventDefault()

    let targetHash = work.type === 'video' ? '#motion' : '#projects'
    try {
      const raw = sessionStorage.getItem(RETURN_POSITION_KEY)
      if (raw) {
        const position = JSON.parse(raw)
        if (work.type === 'video' && position.hash !== '#motion') {
          sessionStorage.removeItem(RETURN_POSITION_KEY)
        } else {
          targetHash = position.hash || targetHash
        }
      }
    } catch {
      sessionStorage.removeItem(RETURN_POSITION_KEY)
    }

    window.location.hash = targetHash
  }

  return (
    <section className="workDetailPage">
      <div className="shell detailGalleryShell videoDetailShell reveal isVisible">
        <a className="detailBack" href={work.type === 'video' ? '#motion' : '#projects'} onClick={handleBack}>
          返回作品
          <ArrowUpRight size={18} />
        </a>
        <header className="detailGalleryHead">
          <p className="sectionKicker">{work.type === 'video' ? 'Motion Detail' : 'Work Detail'}</p>
          <h1>{work.title}</h1>
          {work.type !== 'video' && <span>{work.categoryLabel}</span>}
        </header>
        <div className="detailMediaWrap">
          {work.type === 'video' ? (
            <MotionVideoPlayer key={work.slug} work={work} />
          ) : (
            <img src={work.media} alt={work.title} loading="lazy" decoding="async" />
          )}
        </div>
      </div>
    </section>
  )
}

function MediaLightbox({ work, onClose }) {
  useEffect(() => {
    if (!work) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.classList.add('hasMediaLightbox')
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('hasMediaLightbox')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [work, onClose])

  if (!work) return null

  const isDetail = work.category === 'detail'
  const detailSlices = isDetail
    ? Array.from({ length: 6 }, (_, index) => work.image.replace(/\.jpg$/, `-slice-${String(index + 1).padStart(2, '0')}.jpg`))
    : []

  return (
    <div className={`mediaLightbox ${isDetail ? 'isDetailLightbox' : ''}`} role="dialog" aria-modal="true">
      <button className="lightboxClose" type="button" aria-label="关闭预览" onClick={onClose}>
        ×
      </button>
      {isDetail ? (
        <div className="detailLightboxShell">
          <aside className="detailLightboxHead">
            <p>Overall Display</p>
            <h2>整体展示</h2>
            <span>{work.categoryLabel}</span>
          </aside>
          <div className="detailLightboxTrack">
            {detailSlices.map((image, index) => (
              <figure className="detailPreviewColumn" key={image}>
                <img src={image} alt={`${work.title} 第 ${index + 1} 屏`} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      ) : (
        <div className="imageLightboxStage">
          <img src={work.image} alt={work.title} loading="lazy" decoding="async" />
          <span>{work.categoryLabel}</span>
          <strong>{work.title}</strong>
        </div>
      )}
    </div>
  )
}

function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <div className="shell sectionHead split reveal">
        <div>
          <p className="sectionKicker">Capability</p>
          <h2>
            Build Visual <span className="titleAccent">Systems</span>
          </h2>
        </div>
        <p>
          从产品渲染、AI 创意到电商页面与品牌物料，形成稳定、可复用、能转化的视觉工作流。
        </p>
      </div>
      <div className="shell strengthGrid reveal">
        {strengths.map((item) => {
          const Icon = item.icon
          return (
            <article className="strengthCard" key={item.title}>
              <Icon size={28} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contactFinal" id="contact">
      <div className="shell contactInner reveal">
        <p className="sectionKicker">Contact</p>
        <h2>
          We Build Visuals, <span className="titleAccent">You Build Trust.</span>
        </h2>
        <div className="finalLinks">
          <a href={`mailto:${profile.email}`}>
            <Mail size={22} />
            {profile.email}
          </a>
          <a href={`tel:${profile.phone}`}>
            <Phone size={22} />
            {profile.phone}
          </a>
          <span>
            <BadgeCheck size={22} />
            {profile.location}
          </span>
        </div>
        <a className="primaryAction" href={`mailto:${profile.email}`}>
          发送合作邀请
          <Sparkles size={18} />
        </a>
      </div>
    </section>
  )
}

createRoot(document.getElementById('root')).render(<App />)

