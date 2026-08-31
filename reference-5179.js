const whiteWorks = [
  ["I2 Render 01", "./%E8%80%B3%E6%9C%BA/I2/1.png"],
  ["I2 Render 02", "./%E8%80%B3%E6%9C%BA/I2/2.png"],
  ["I2 Render 03", "./%E8%80%B3%E6%9C%BA/I2/3.png"],
  ["BC10 Black", "./%E8%80%B3%E6%9C%BA/BC10/%E9%BB%91%20(1).jpg"],
  ["BC10 Purple", "./%E8%80%B3%E6%9C%BA/BC10/%E7%B4%AB%20(4).jpg"],
  ["mc02 max 01", "./%E8%80%B3%E6%9C%BA/mc02%20max/1%20(1).jpg"],
  ["mc02 max 02", "./%E8%80%B3%E6%9C%BA/mc02%20max/2%20(3).jpg"],
  ["mc02 max 03", "./%E8%80%B3%E6%9C%BA/mc02%20max/3%20(3).jpg"],
  ["Glow Headset 01", "./%E8%80%B3%E6%9C%BA/%E5%8F%91%E5%85%89%E8%80%B3%E6%9C%BA/123_DeMain_0000.png"],
  ["Glow Headset 02", "./%E8%80%B3%E6%9C%BA/%E5%8F%91%E5%85%89%E8%80%B3%E6%9C%BA/%E5%9B%BE%E5%B1%82%2016.jpg"],
  ["Glow Headset 03", "./%E8%80%B3%E6%9C%BA/%E5%8F%91%E5%85%89%E8%80%B3%E6%9C%BA/%E5%9B%BE%E5%B1%82%2017.jpg"],
  ["Dumpling Blue", "./%E8%80%B3%E6%9C%BA/%E6%B0%B4%E9%A5%BA/1-%E8%93%9D.jpg"],
  ["Dumpling Black", "./%E8%80%B3%E6%9C%BA/%E6%B0%B4%E9%A5%BA/1-%E9%BB%91.jpg"],
  ["Dumpling Pink", "./%E8%80%B3%E6%9C%BA/%E6%B0%B4%E9%A5%BA/2-%E7%B2%89.jpg"],
  ["Dumpling Detail", "./%E8%80%B3%E6%9C%BA/%E6%B0%B4%E9%A5%BA/%E5%9B%BE%E5%B1%82%2010.jpg"],
  ["Lighting 01", "./%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9/1.jpg"],
].map(([title, src]) => ({ title, src }));

function initParticleHero() {
  const canvas = document.querySelector("#particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let panels = [];
  let shards = [];
  let sparks = [];
  let frame = 0;
  let lastDraw = 0;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const panelCount = Math.max(38, Math.min(64, Math.floor(width / 25)));
    panels = Array.from({ length: panelCount }, (_, index) => ({
      side: index % 2 === 0 ? -1 : 1,
      offset: (index / panelCount) * 1.18 - 0.58,
      depth: 0.72 + Math.random() * 0.62,
      width: 24 + Math.random() * 40,
      height: 130 + Math.random() * 260,
      tilt: (Math.random() - 0.5) * 0.18,
      phase: Math.random() * Math.PI * 2,
      bright: index % 5 === 0,
    }));
    shards = Array.from({ length: 14 }, (_, index) => ({
      angle: -1.1 + index * 0.22,
      length: 150 + Math.random() * 220,
      width: 18 + Math.random() * 44,
      shift: Math.random() * 76 - 38,
      alpha: 0.42 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
    }));
    sparks = Array.from({ length: 96 }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.72,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.4 + 0.12,
      alpha: Math.random() * 0.42 + 0.16,
      phase: index * 0.37,
    }));
  }

  function drawPanel(cx, cy, w, h, tilt, alpha, bright) {
    const top = cy - h * 0.5;
    const bottom = cy + h * 0.5;
    const skew = tilt * h;
    const points = [
      [cx - w * 0.5 + skew, top],
      [cx + w * 0.5 + skew + 18, top + 16],
      [cx + w * 0.5 - skew, bottom],
      [cx - w * 0.5 - skew - 20, bottom - 18],
    ];
    const gradient = ctx.createLinearGradient(cx - w, top, cx + w, bottom);
    gradient.addColorStop(0, bright ? `rgba(210,244,255,${alpha * 0.72})` : `rgba(1,18,70,${alpha})`);
    gradient.addColorStop(0.42, `rgba(10,80,178,${alpha * 0.74})`);
    gradient.addColorStop(1, `rgba(0,2,34,${alpha * 0.96})`);

    ctx.beginPath();
    points.forEach(([x, y], index) => {
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = bright ? "rgba(230,252,255,0.82)" : "rgba(37,164,255,0.42)";
    ctx.lineWidth = bright ? 2.2 : 1.2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[0][0] + w * 0.24, points[0][1] + 12);
    ctx.lineTo(points[2][0] - w * 0.18, points[2][1] - 14);
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function drawShard(cx, cy, angle, length, w, alpha) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    const gradient = ctx.createLinearGradient(0, -w, length, w);
    gradient.addColorStop(0, `rgba(235,250,255,${alpha * 0.9})`);
    gradient.addColorStop(0.5, `rgba(52,185,255,${alpha * 0.72})`);
    gradient.addColorStop(1, `rgba(0,32,130,${alpha * 0.46})`);
    ctx.beginPath();
    ctx.moveTo(-length * 0.12, -w * 0.46);
    ctx.lineTo(length * 0.68, -w);
    ctx.lineTo(length, 0);
    ctx.lineTo(length * 0.64, w);
    ctx.lineTo(-length * 0.18, w * 0.42);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = "rgba(218,248,255,0.62)";
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.restore();
  }

  function draw(timestamp = 0) {
    if (!reduceMotion && timestamp - lastDraw < 33) {
      requestAnimationFrame(draw);
      return;
    }
    lastDraw = timestamp;
    ctx.clearRect(0, 0, width, height);

    const base = ctx.createLinearGradient(0, 0, width, height);
    base.addColorStop(0, "#071b3c");
    base.addColorStop(0.28, "#031127");
    base.addColorStop(0.7, "#020819");
    base.addColorStop(1, "#000108");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, width, height);

    const orbit = reduceMotion ? 0 : Math.sin(frame * 0.012) * width * 0.025;
    const centerX = width * 0.48 + orbit;
    const centerY = height * 0.44 + Math.cos(frame * 0.01) * height * 0.018;
    const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.54);
    glow.addColorStop(0, "rgba(235,250,255,0.36)");
    glow.addColorStop(0.18, "rgba(36,185,255,0.2)");
    glow.addColorStop(0.42, "rgba(0,74,210,0.12)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    panels.forEach((panel, index) => {
      const wave = Math.sin(frame * 0.027 + panel.phase) * 18;
      const drift = Math.sin(frame * 0.008 + index * 0.3) * 28;
      const railX = centerX + panel.side * (95 + Math.abs(panel.offset) * width * 0.78) + drift;
      const railY = centerY + panel.offset * height * 0.56 + wave;
      const scale = panel.depth * (1.08 - Math.abs(panel.offset) * 0.28);
      drawPanel(
        railX,
        railY,
        panel.width * scale,
        panel.height * scale,
        panel.side * (0.12 + panel.tilt),
        panel.bright ? 0.62 : 0.4,
        panel.bright,
      );
      if (index % 4 === 0) {
        ctx.strokeStyle = "rgba(105,225,255,0.12)";
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(railX, railY);
        ctx.stroke();
      }
    });

    shards.forEach((shard, index) => {
      const angle = shard.angle + Math.sin(frame * 0.012 + shard.phase) * 0.035;
      const cx = centerX + Math.cos(angle) * shard.shift;
      const cy = centerY + Math.sin(angle) * shard.shift;
      drawShard(cx, cy, angle, shard.length, shard.width, index % 3 === 0 ? 0.66 : shard.alpha * 0.82);
    });

    sparks.forEach((spark, index) => {
      if (!reduceMotion) {
        spark.y += spark.speed;
        spark.x += Math.sin(frame * 0.012 + spark.phase) * 0.08;
        if (spark.y > height) spark.y = -10;
      }

      ctx.beginPath();
      ctx.fillStyle = `rgba(190,236,255,${spark.alpha * 0.72})`;
      ctx.arc(spark.x, spark.y, spark.r, 0, Math.PI * 2);
      ctx.fill();
    });

    const vignette = ctx.createLinearGradient(0, 0, 0, height);
    vignette.addColorStop(0, "rgba(0,0,8,0.18)");
    vignette.addColorStop(0.52, "rgba(0,0,12,0.08)");
    vignette.addColorStop(1, "rgba(0,0,8,0.86)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    frame += 1;
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

function initHeroBackgroundVideo() {
  const video = document.querySelector(".hero-bg-video");
  if (!video) return;

  video.muted = true;
  video.loop = true;
  video.playsInline = true;

  const playVideo = () => video.play().catch(() => {});
  playVideo();
  window.addEventListener("pointermove", playVideo, { once: true });
  window.addEventListener("scroll", playVideo, { once: true });
}

const sceneWorks = [
  ["Scene 01", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/1.jpg"],
  ["Scene 02", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/123_DeMain_0000.png"],
  ["Scene 03", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/2.jpg"],
  ["Scene 04", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/3.jpg"],
  ["Scene 05", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/4.jpg"],
  ["Scene 06", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/6.jpg"],
  ["Scene 07", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/800%C3%97600-2.png"],
  ["AOC 01", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/AOC1.jpg"],
  ["AOC 02", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/AOC2.jpg"],
  ["AOC 03", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/AOC3.jpg"],
  ["TK31", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/TK31.jpg"],
  ["Scene Layer 01", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%201.jpg"],
  ["Scene Layer 15", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%2015.jpg"],
  ["Scene Layer 16", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%2016.jpg"],
  ["Scene Layer 17", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%2017.jpg"],
  ["Scene Layer 02", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%202.jpg"],
  ["Scene Layer 03", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%203.jpg"],
  ["Scene Layer 04", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%204.jpg"],
  ["Scene Layer 05", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%205.jpg"],
  ["Scene Layer 727", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%20727.png"],
  ["Scene Layer 730", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%20730.png"],
  ["Scene Layer 731", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%20731.png"],
  ["Scene Layer 732", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%20732.png"],
  ["Scene Layer 734", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%20734.png"],
  ["Scene Layer 735", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%20735.png"],
  ["Scene Layer 736", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E5%9B%BE%E5%B1%82%20736.png"],
  ["Exploded View", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E7%88%86%E7%82%B8(1).png"],
  ["Board 01", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E7%94%BB%E6%9D%BF%201.jpg"],
  ["Board 02", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E7%94%BB%E6%9D%BF%202.jpg"],
  ["Board 03", "./%E5%9C%BA%E6%99%AF%E5%9B%BE/%E7%94%BB%E6%9D%BF%203.jpg"],
].map(([title, src]) => ({ title, src }));

const detailWorks = [
  ["Detail Page 38", "./%E8%AF%A6%E6%83%85%E9%A1%B5/%E8%AF%A6%E6%83%85%E9%A1%B5%20(1).jpg"],
  ["Detail Page 39", "./%E8%AF%A6%E6%83%85%E9%A1%B5/%E8%AF%A6%E6%83%85%E9%A1%B5%20(2).jpg"],
  ["Detail Page 40", "./%E8%AF%A6%E6%83%85%E9%A1%B5/%E8%AF%A6%E6%83%85%E9%A1%B5%20(3).jpg"],
].map(([title, src]) => ({ title, src }));

const visualWorks = sceneWorks;

const motionProjects = [
  {
    title: "I2 Main Film",
    href: "./motion-i2.html",
    src: "./%E8%80%B3%E6%9C%BA/I2/I2.mp4",
    poster: "./video-covers/%E8%80%B3%E6%9C%BA_I2_I2.jpg",
  },
  {
    title: "BC10 Main Film",
    href: "./motion-bc10.html",
    src: "./%E8%80%B3%E6%9C%BA/BC10/BC10.mp4",
    poster: "./video-covers/%E8%80%B3%E6%9C%BA_BC10_BC10.jpg",
  },
  {
    title: "ZST Main Film",
    href: "./motion-zst.html",
    src: "./%E8%80%B3%E6%9C%BA/ZST/ZST.mp4",
    poster: "./video-covers/%E8%80%B3%E6%9C%BA_ZST_ZST.jpg",
  },
  {
    title: "Glow Headset Main Film",
    href: "./motion-glow-headset.html",
    src: "./%E8%80%B3%E6%9C%BA/%E5%8F%91%E5%85%89%E8%80%B3%E6%9C%BA/%E5%8F%91%E5%85%89%E8%80%B3%E6%9C%BA.mp4",
    poster: "./video-covers/%E8%80%B3%E6%9C%BA_%E5%8F%91%E5%85%89%E8%80%B3%E6%9C%BA_%E5%8F%91%E5%85%89%E8%80%B3%E6%9C%BA.jpg",
    featured: true,
  },
  {
    title: "Dumpling Motion",
    href: "./motion-dumpling.html",
    src: "./%E8%80%B3%E6%9C%BA/%E6%B0%B4%E9%A5%BA/5%E6%9C%8822%E6%97%A5.mp4",
    poster: "./video-covers/%E8%80%B3%E6%9C%BA_%E6%B0%B4%E9%A5%BA_5%E6%9C%8822%E6%97%A5.jpg",
  },
];

const whiteList = document.querySelector("#white-list");
const visualList = document.querySelector("#visual-list");
const selectedList = document.querySelector("#selected-list");
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const worksMoreButton = document.querySelector("#works-more");
const motionList = document.querySelector("#motion-list");
const lightbox = document.querySelector(".lightbox");
const stage = document.querySelector(".lightbox-stage");
const lightboxTitle = document.querySelector(".lightbox-title");
const closeButton = document.querySelector(".close-button");
const INITIAL_WORK_LIMIT = 12;
let activeWorkFilter = "all";
let worksExpanded = false;

function openLightbox({ src, title, type }) {
  stage.replaceChildren();
  lightboxTitle.textContent = title;

  const media =
    type === "video"
      ? Object.assign(document.createElement("video"), {
          src,
          controls: true,
          autoplay: true,
          loop: true,
          playsInline: true,
        })
      : Object.assign(document.createElement("img"), {
          src,
          alt: `${title} preview`,
        });

  stage.append(media);
  lightbox.showModal();
}

function openDetailGallery(activeWork) {
  const selectedWork = typeof activeWork === "string" ? detailWorks.find((work) => work.title === activeWork) : activeWork;
  const work = selectedWork || detailWorks[0];
  const workIndex = detailWorks.indexOf(work) + 38;
  const overlay = document.createElement("section");
  overlay.className = "detail-gallery-page";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Detail page overall display");
  overlay.innerHTML = `
    <button class="detail-close" type="button" aria-label="Close detail page">x</button>
    <div class="detail-gallery-shell">
      <header class="detail-gallery-head">
        <p>Overall Display</p>
        <h2>整体展示</h2>
        <span>${work.title || "Details"} / 分列裁切</span>
      </header>
      <div class="detail-gallery-grid detail-slice-grid" data-src="${work.src}" data-title="${work.title}" data-index="${workIndex}">
        <p class="detail-loading">Loading detail page...</p>
      </div>
    </div>
  `;

  const close = () => {
    overlay.remove();
    document.body.classList.remove("has-detail-gallery");
  };
  overlay.querySelector(".detail-close").addEventListener("click", close);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && document.body.contains(overlay)) close();
    },
    { once: true },
  );
  document.body.classList.add("has-detail-gallery");
  document.body.append(overlay);
  renderDetailSlices(overlay.querySelector(".detail-slice-grid"));
}

function getDetailColumnCount() {
  if (window.innerWidth < 720) return 2;
  if (window.innerWidth < 1180) return 3;
  return 5;
}

function renderDetailSlices(grid) {
  if (!grid) return;
  const src = grid.dataset.src;
  const title = grid.dataset.title || "Detail Page";
  const index = grid.dataset.index || "";
  const image = new Image();
  image.onload = () => {
    const columnCount = getDetailColumnCount();
    const gap = columnCount === 2 ? 14 : 24;
    const gridWidth = grid.clientWidth || 960;
    const columnWidth = (gridWidth - gap * (columnCount - 1)) / columnCount;
    const scale = columnWidth / image.naturalWidth;
    const scaledImageHeight = image.naturalHeight * scale;
    const targetColumnHeight = scaledImageHeight / columnCount;
    const minSliceHeight = columnCount === 2 ? 210 : 280;
    const maxSliceHeight = columnCount === 2 ? 430 : 620;
    const columns = Array.from({ length: columnCount }, () => []);
    let sourceY = 0;

    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
      let columnHeight = 0;
      while (sourceY < image.naturalHeight && (columnIndex === columnCount - 1 || columnHeight < targetColumnHeight)) {
        const displayHeight = Math.min(
          maxSliceHeight,
          Math.max(minSliceHeight, targetColumnHeight - columnHeight),
        );
        const sourceHeight = Math.min(image.naturalHeight - sourceY, displayHeight / scale);
        if (sourceHeight <= 0) break;
        columns[columnIndex].push({
          y: sourceY,
          sourceHeight,
          displayHeight: sourceHeight * scale,
        });
        sourceY += sourceHeight;
        columnHeight += sourceHeight * scale;
      }
    }

    grid.replaceChildren();
    columns.forEach((slices, columnIndex) => {
      const column = document.createElement("div");
      column.className = "detail-slice-column";
      column.setAttribute("aria-label", `${title} column ${columnIndex + 1}`);
      slices.forEach((slice, sliceIndex) => {
        const tile = document.createElement("figure");
        tile.className = "detail-gallery-item detail-slice-item";
        tile.innerHTML = `
          <span
            class="detail-slice-image"
            role="img"
            aria-label="${title} slice ${columnIndex + 1}-${sliceIndex + 1}"
            style="
              height:${slice.displayHeight}px;
              background-image:url('${src}');
              background-size:${columnWidth}px ${scaledImageHeight}px;
              background-position:center -${slice.y * scale}px;
            "
          ></span>
        `;
        column.append(tile);
      });
      grid.append(column);
    });

    const caption = document.createElement("p");
    caption.className = "detail-slice-caption";
    caption.textContent = `${index} / ${title}`;
    grid.after(caption);
  };
  image.onerror = () => {
    grid.innerHTML = `<figure class="detail-gallery-item detail-full-item"><img src="${src}" alt="${title}" /></figure>`;
  };
  image.src = src;
}
function createImageButton(work, className, index = 0) {
  const button = document.createElement("button");
  const category = className.includes("white") ? "Product Render" : "Visual Design";
  button.className = `${className} selected-work-card`;
  button.type = "button";
  button.innerHTML = `
    <img src="${work.src}" alt="${work.title}" loading="${index < 8 ? "eager" : "lazy"}" />
    <span class="work-hover-title">${work.title}</span>
    <div class="work-meta">
      <small>${String(index + 1).padStart(2, "0")}</small>
      <strong>${work.title}</strong>
      <em>${category}</em>
    </div>
  `;
  button.addEventListener("click", () => openLightbox({ ...work, type: "image" }));
  return button;
}

function createSelectedWorkCard(work, index = 0) {
  const button = document.createElement("button");
  button.className = `selected-work-tile selected-work-card is-${work.category}`;
  button.type = "button";
  button.dataset.category = work.category;
  button.innerHTML = `
    <span class="selected-cover">
      <img src="${work.src}" alt="${work.title}" loading="${index < 8 ? "eager" : "lazy"}" />
    </span>
    <span class="selected-caption">
      <small>${String(index + 1).padStart(2, "0")} · ${work.label}</small>
      <strong>${work.title}</strong>
    </span>
  `;

  const image = button.querySelector("img");
  const setOrientation = () => {
    if (!image.naturalWidth || !image.naturalHeight) return;
    const ratio = image.naturalWidth / image.naturalHeight;
    button.classList.remove("is-wide", "is-square", "is-portrait");

    if (work.category === "detail") {
      button.classList.add("is-portrait");
    } else if (ratio > 1.28) {
      button.classList.add("is-wide");
    } else if (ratio < 0.82) {
      button.classList.add("is-portrait");
    } else {
      button.classList.add("is-square");
    }
  };
  const updateImageLayout = () => {
    setOrientation();
  };

  image.addEventListener("load", updateImageLayout);
  if (image.complete) updateImageLayout();
  button.addEventListener("click", () => {
    if (button.dataset.category === "detail") {
      openDetailGallery(work);
      return;
    }
    openLightbox({ ...work, type: "image" });
  });
  return button;
}

function applyWorkFilter(filter) {
  if (!selectedList) return;
  activeWorkFilter = filter;

  const cards = Array.from(selectedList.querySelectorAll(".selected-work-tile"));
  const matchedCards = cards.filter((card) => filter === "all" || card.dataset.category === filter);

  cards.forEach((card) => {
    card.hidden = true;
  });
  matchedCards.forEach((card, index) => {
    card.hidden = !worksExpanded && index >= INITIAL_WORK_LIMIT;
  });

  if (!worksMoreButton) return;
  const shouldCollapse = matchedCards.length > INITIAL_WORK_LIMIT;
  worksMoreButton.hidden = !shouldCollapse;
  worksMoreButton.textContent = worksExpanded ? "收起" : "More";
  worksMoreButton.setAttribute("aria-expanded", String(worksExpanded));
}

function renderSelectedWorks() {
  if (!selectedList) return;

  const works = [
    ...whiteWorks.map((work) => ({ ...work, category: "white", label: "白底图" })),
    ...sceneWorks.map((work) => ({ ...work, category: "scene", label: "场景图" })),
    ...detailWorks.map((work) => ({ ...work, category: "detail", label: "详情页" })),
  ];

  works.forEach((work, index) => selectedList.append(createSelectedWorkCard(work, index)));

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      worksExpanded = false;
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      applyWorkFilter(button.dataset.filter);
    });
  });

  if (worksMoreButton) {
    worksMoreButton.addEventListener("click", () => {
      worksExpanded = !worksExpanded;
      applyWorkFilter(activeWorkFilter);
      if (!worksExpanded) {
        document.querySelector("#selected-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  applyWorkFilter("all");
}
function renderWhiteWorks() {
  whiteWorks.forEach((work, index) => {
    whiteList.append(createImageButton(work, "white-card", index));
  });
}

function renderVisuals() {
  visualWorks.forEach((work, index) => {
    const button = createImageButton(work, "visual-card", index);
    const image = button.querySelector("img");
    const markTallImage = () => {
      if (image.naturalWidth > 0 && image.naturalHeight / image.naturalWidth > 1.55) {
        button.classList.add("is-tall");
        button.setAttribute("aria-label", `${work.title}, click to view full image`);
      }
    };
    image.addEventListener("load", markTallImage);
    if (image.complete) markTallImage();
    visualList.append(button);
  });
}

function createMotionLink(project, className = "motion-card", index = 0) {
  const link = document.createElement("a");
  link.className = `${className} selected-work-card`;
  link.href = project.href;
  link.setAttribute("aria-label", `Open ${project.title} detail page`);

  const preview = Object.assign(document.createElement("img"), {
    src: project.poster,
    alt: `${project.title} cover`,
    loading: index < 3 ? "eager" : "lazy",
  });

  const label = document.createElement("span");
  label.className = "work-hover-title";
  label.textContent = project.title;
  const meta = document.createElement("div");
  meta.className = "work-meta";
  meta.innerHTML = `
    <small>${String(index + 1).padStart(2, "0")}</small>
    <strong>${project.title}</strong>
    <em>Motion Film</em>
  `;

  link.append(preview, label, meta);
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.assign(project.href);
  });
  return link;
}

function renderMotion() {
  const featured = motionProjects.find((project) => project.featured) || motionProjects[0];
  const featuredPanel = document.createElement("section");
  featuredPanel.className = "featured-motion";
  featuredPanel.innerHTML = `
    <div class="featured-copy">
      <p class="kicker">Featured Motion</p>
      <h3>${featured.title}</h3>
      <p>进入二级页面查看主视频与对应分镜视频。</p>
    </div>
  `;
  featuredPanel.prepend(createMotionLink(featured, "motion-card featured-card", motionProjects.indexOf(featured)));
  motionList.append(featuredPanel);

  const group = document.createElement("section");
  group.className = "motion-group";
  group.innerHTML = "<h3>Main Films</h3>";
  const grid = document.createElement("div");
  grid.className = "motion-grid";
  motionProjects.forEach((project, index) => grid.append(createMotionLink(project, "motion-card", index)));
  group.append(grid);
  motionList.append(group);
}

function closeLightbox() {
  stage.querySelectorAll("video").forEach((video) => video.pause());
  lightbox.close();
}

initHeroBackgroundVideo();
initParticleHero();
renderSelectedWorks();
renderMotion();

closeButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener("close", () => stage.replaceChildren());

