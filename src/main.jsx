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
  roles: '视觉设计师 / AI 设计师 / 品牌设计师',
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

const flatWhiteFiles = [
  '/assets/flat-white-01.jpg',
  '/assets/flat-white-02.png',
  '/assets/flat-white-03.jpg',
  '/assets/flat-white-04.png',
  '/assets/flat-white-05.png',
  '/assets/flat-white-06.jpg',
  '/assets/flat-white-07.jpg',
  '/assets/flat-white-08.jpg',
]

const flatSceneFiles = [
  '/assets/flat-scene-01.jpg',
  '/assets/flat-scene-02.jpg',
  '/assets/flat-scene-03.jpg',
  '/assets/flat-scene-04.jpg',
  '/assets/flat-scene-05.jpg',
  '/assets/flat-scene-06.jpg',
  '/assets/flat-scene-07.jpg',
  '/assets/flat-scene-08.jpg',
  '/assets/flat-scene-09.png',
  '/assets/flat-scene-10.jpg',
  '/assets/flat-scene-11.jpg',
  '/assets/flat-scene-12.jpg',
  '/assets/flat-scene-13.png',
  '/assets/flat-scene-14.jpg',
  '/assets/flat-scene-15.png',
  '/assets/flat-scene-16.jpg',
  '/assets/flat-scene-17.png',
  '/assets/flat-scene-18.png',
  '/assets/flat-scene-19.jpg',
  '/assets/flat-scene-20.jpg',
  '/assets/flat-scene-21.jpg',
  '/assets/flat-scene-22.png',
  '/assets/flat-scene-23.jpg',
  '/assets/flat-scene-24.jpg',
  '/assets/flat-scene-25.jpg',
  '/assets/flat-scene-26.jpg',
  '/assets/flat-scene-27.jpg',
  '/assets/flat-scene-28.jpg',
  '/assets/flat-scene-29.jpg',
  '/assets/flat-scene-30.png',
  '/assets/flat-scene-31.png',
  '/assets/flat-scene-32.png',
  '/assets/flat-scene-33.png',
  '/assets/flat-scene-34.png',
  '/assets/flat-scene-35.png',
  '/assets/flat-scene-36.png',
  '/assets/flat-scene-37.png',
  '/assets/flat-scene-38.png',
  '/assets/flat-scene-39.png',
]

const flatDetailFiles = [
  '/assets/flat-detail-01.jpg',
  '/assets/flat-detail-02.jpg',
  '/assets/flat-detail-03.jpg',
]

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

const folderWhiteWorks = makeFolderWorks(
  flatWhiteFiles,
  'white',
  '白底图',
  '耳机白底图',
  '来自耳机文件夹的产品静态图，用于展示产品结构、材质和单品渲染。'
)

const folderSceneWorks = makeFolderWorks(
  flatSceneFiles,
  'scene',
  '场景图',
  '场景图',
  '来自场景图文件夹的视觉作品，用于展示产品在不同空间和营销场景中的表达。'
)

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

const motionWorks = [
  {
    title: '发光耳机动态主片',
    slug: 'motion-glow-earphone',
    tag: 'Motion Render',
    video: '/assets/motion-glow-earphone.mp4',
    poster: '/assets/motion-cover-glow.jpg',
    text: '以光效、产品转场和材质细节建立新品传播中的动态记忆点。',
  },
  {
    title: 'BC10 产品动画',
    slug: 'motion-bc10',
    tag: 'Product Film',
    video: '/assets/motion-bc10.mp4',
    poster: '/assets/motion-cover-bc10.jpg',
    text: '面向电商与内容平台的产品动态展示，突出外观、佩戴和核心卖点。',
  },
  {
    title: 'I2 耳机动画',
    slug: 'motion-i2',
    tag: 'E-commerce Motion',
    video: '/assets/motion-i2.mp4',
    poster: '/assets/motion-cover-i2.jpg',
    text: '通过简洁镜头语言呈现产品结构与系列感，适配详情页和短视频投放。',
  },
  {
    title: 'ZST 产品动画',
    slug: 'motion-zst',
    tag: 'Product Motion',
    video: '/assets/motion-zst.mp4',
    poster: '/assets/motion-cover-zst.jpg',
    text: 'ZST 系列产品动态展示。',
  },
  {
    title: 'TB-X 产品动画',
    slug: 'motion-tbx',
    tag: 'Product Film',
    video: '/assets/motion-new-tbx.mp4',
    poster: '/assets/work-scene-ca01-tc.jpg',
    text: '新增产品动画作品，补充产品动态展示与传播素材。',
  },
  {
    title: 'NC01 产品动画',
    slug: 'motion-en',
    tag: 'Motion Version',
    video: '/assets/motion-new-en.mp4',
    poster: '/assets/work-scene-new-01.jpg',
    text: '新增英文版动态作品，适合海外传播和多语言物料展示。',
  },
  {
    title: 'TB-PRO 产品动画',
    slug: 'motion-jp',
    tag: 'Motion Version',
    video: '/assets/motion-new-jp.mp4',
    poster: '/assets/work-scene-new-02.jpg',
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

const heroSkills = ['C4D', 'Ps', 'Ai', 'Ae', 'Pr']

const toolIcons = [
  { name: 'C4D', label: 'Cinema 4D' },
  { name: 'Ps', label: 'Photoshop' },
  { name: 'Ai', label: 'Illustrator' },
  { name: 'Ae', label: 'After Effects' },
  { name: 'Pr', label: 'Premiere Pro' },
]

const galleryItems = [
  { image: '/assets/flat-scene-08.jpg', label: 'Scene Visual 08', slug: 'scene-08' },
  { image: '/assets/flat-scene-10.jpg', label: 'Scene Visual 10', slug: 'scene-10' },
  { image: '/assets/flat-scene-22.png', label: 'Scene Visual 22', slug: 'scene-22' },
  { image: '/assets/flat-scene-23.jpg', label: 'Scene Visual 23', slug: 'scene-23' },
  { image: '/assets/flat-scene-24.jpg', label: 'Scene Visual 24', slug: 'scene-24' },
  { image: '/assets/flat-scene-25.jpg', label: 'Scene Visual 25', slug: 'scene-25' },
  { image: '/assets/flat-scene-26.jpg', label: 'Scene Visual 26', slug: 'scene-26' },
  { image: '/assets/flat-scene-38.png', label: 'Scene Visual 38', slug: 'scene-38' },
  { image: '/assets/flat-scene-39.png', label: 'Scene Visual 39', slug: 'scene-39' },
]

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

const RETURN_POSITION_KEY = 'keysonPortfolioReturnPosition'

function saveReturnPosition(fallbackHash) {
  sessionStorage.setItem(
    RETURN_POSITION_KEY,
    JSON.stringify({
      hash: window.location.hash && !window.location.hash.startsWith('#work/') ? window.location.hash : fallbackHash,
      y: window.scrollY,
    }),
  )
}

function App() {
  const activeWork = useActiveWork()
  const [lightboxWork, setLightboxWork] = useState(null)
  const routeKey = activeWork ? `work-${activeWork.slug}` : `main-${window.location.hash || '#home'}`
  useScrollReveal(routeKey)
  useReturnPosition(activeWork)

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
      <FeaturedProjects onOpenWork={setLightboxWork} />
      <MotionWorks />
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

function useReturnPosition(activeWork) {
  useEffect(() => {
    if (activeWork) return

    const raw = sessionStorage.getItem(RETURN_POSITION_KEY)
    if (!raw) return

    sessionStorage.removeItem(RETURN_POSITION_KEY)
    try {
      const position = JSON.parse(raw)
      window.setTimeout(() => {
        window.scrollTo({ top: position.y || 0, behavior: 'auto' })
      }, 0)
    } catch {
      sessionStorage.removeItem(RETURN_POSITION_KEY)
    }
  }, [activeWork])
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
        <a href="#projects">作品</a>
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
      <video
        className="heroVideo"
        src="/assets/hero-abstract-blue.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/project-render.png"
      />
      <div className="heroShade" />
      <div className="heroInner shell">
        <p className="heroEyebrow">{profile.name} · {profile.alias}</p>
        <div className="heroTitle" aria-label="Portfolio">
          <span>PORT</span>
          <span>FOLIO</span>
        </div>
        <div className="heroSkills" aria-label="核心能力">
          {heroSkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
        <div className="heroStage reveal">
          <aside className="heroIntro" aria-label="个人简介">
            <span className="introLine" />
            <p>
              {profile.roles}
              <br />
              以 3D 渲染、AI 工作流与品牌视觉系统，为数码产品建立更有质感与识别度的商业表达。
            </p>
            <a className="introAction" href="#projects">
              查看作品
              <ArrowUpRight size={17} />
            </a>
          </aside>
          <div className="heroVisual" aria-label="3D 人物主视觉">
            <div className="toolOrbit" aria-label="设计工具">
              {toolIcons.map((tool, index) => (
                <span className={`toolIcon toolIcon${index + 1}`} key={tool.name}>
                  <strong>{tool.name}</strong>
                  <small>{tool.label}</small>
                </span>
              ))}
            </div>
            <img src="/assets/keyson-comic-clean.png" alt="Keyson 漫画 3D 人物主视觉" />
          </div>
          <aside className="heroStats" aria-label="项目数据">
            <div>
              <strong>6+</strong>
              <span>年渲染视觉设计经验</span>
            </div>
            <div>
              <strong>多品类</strong>
              <span>消费电子与个护项目</span>
            </div>
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
          const opacity = 0.34 + lift * 0.62
          const rotate = (progress - 0.5) * (isMobile ? 12 : 18)
          const depth = Math.round(10 + lift * 40)

          card.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`
          card.style.opacity = opacity.toFixed(3)
          card.style.zIndex = String(depth)
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
          <img src={item.image} alt={item.label} />
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
          <img src="/assets/keyson-avatar.png" alt="Keyson 个人头像插画" />
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
              <strong>Brand / 3D / AIGC</strong>
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

function FeaturedProjects({ onOpenWork }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [expanded, setExpanded] = useState(false)
  const filteredWorks = selectedWorks.filter((work) => activeFilter === 'all' || work.category === activeFilter)
  const visibleWorks = expanded ? filteredWorks : filteredWorks.slice(0, 8)

  return (
    <section className="section projects" id="projects">
      <div className="shell worksBoard reveal">
        <div className="worksBoardHead">
          <div>
            <p className="sectionKicker">Selected Works</p>
            <h2>
              Explore Our <span className="titleAccent">Portfolio</span>
            </h2>
          </div>
          <div className="workFilters" aria-label="作品分类筛选">
            {workFilters.map((filter) => (
              <button
                className={activeFilter === filter.id ? 'isActive' : ''}
                type="button"
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id)
                  setExpanded(false)
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="selectedGrid">
          {visibleWorks.map((work, index) => (
            <button
              type="button"
              className={`selectedWorkTile tile${index + 1}`}
              key={work.title}
              onClick={() => onOpenWork(work)}
            >
              <img src={work.image} alt={work.title} />
              <div className="workMeta">
                <small>{work.categoryLabel}</small>
                <strong>{work.title}</strong>
              </div>
            </button>
          ))}
        </div>
        {filteredWorks.length > 8 && (
          <button className="worksMore" type="button" onClick={() => setExpanded((value) => !value)}>
            {expanded ? '收起' : 'More'}
          </button>
        )}
      </div>
    </section>
  )
}

function MotionWorks() {
  const handlePlay = (event) => {
    event.currentTarget.play().catch(() => {})
  }

  const handlePause = (event) => {
    event.currentTarget.pause()
    event.currentTarget.currentTime = 0
  }

  return (
    <section className="section motionWorks" id="motion">
      <div className="shell sectionHead split reveal">
        <div>
          <p className="sectionKicker">Motion Works</p>
          <h2>
            Product <span className="titleAccent">Films</span>
          </h2>
        </div>
        <p>
          动画作品以项目入口的方式呈现：默认静态封面保持页面克制，鼠标悬浮时播放预览，方便快速判断作品质感。
        </p>
      </div>
      <div className="shell featuredMotion reveal">
        <a
          className="motionCard motionCardLarge"
          href={`#work/${motionWorks[0].slug}`}
          onClick={() => saveReturnPosition('#motion')}
        >
          <video
            src={motionWorks[0].video}
            poster={motionWorks[0].poster}
            muted
            loop
            playsInline
            preload="none"
            onMouseEnter={handlePlay}
            onMouseLeave={handlePause}
          />
          <div className="motionMeta">
            <strong>{motionWorks[0].title}</strong>
          </div>
        </a>
        <div className="featuredCopy">
          <h3>用动态镜头讲清产品价值</h3>
          <p>{motionWorks[0].text}</p>
          <a href={`#work/${motionWorks[0].slug}`} onClick={() => saveReturnPosition('#motion')}>
            查看主片
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <div className="shell motionGrid reveal">
        {motionWorks.slice(1).map((work) => (
          <a
            className="motionCard"
            href={`#work/${work.slug}`}
            key={work.title}
            onClick={() => saveReturnPosition('#motion')}
          >
            <video
              src={work.video}
              poster={work.poster}
              muted
              loop
              playsInline
              preload="none"
              onMouseEnter={handlePlay}
              onMouseLeave={handlePause}
            />
            <div className="motionMeta">
              <strong>{work.title}</strong>
              <p>{work.text}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
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
        targetHash = position.hash || targetHash
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
            <video src={work.media} poster={work.image} controls autoPlay muted loop playsInline />
          ) : (
            <img src={work.media} alt={work.title} />
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
            <figure className="detailPreviewColumn">
              <img src={work.image} alt={work.title} />
            </figure>
          </div>
        </div>
      ) : (
        <div className="imageLightboxStage">
          <img src={work.image} alt={work.title} />
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

