```
         ___
        (   )
        .--.
       /° ° \      ★★★★★ 传奇 蘑菇
      (______)     "Truffle"
        |  |       智慧 100 · 帽子: 礼帽
```

<h1 align="center">claude-buddy</h1>

<p align="center">
  <b>Claude Code <code>/buddy</code> 宠物系统完全百科 & 自定义工具</b><br>
  <sub>18 物种 · 5 稀有度 · 7,128 种独特组合 · 二进制级别定制</sub>
</p>

<p align="center">
  <a href="#-快速开始">快速开始</a> ·
  <a href="#-百科全书">百科全书</a> ·
  <a href="#%EF%B8%8F-锻造--自定义宠物">锻造</a> ·
  <a href="#-工作原理">工作原理</a> ·
  <a href="./README.md">English</a>
</p>

---

## 什么是 /buddy？

`/buddy` 是 [Claude Code](https://code.claude.com)（Anthropic 官方编程 CLI）内置的虚拟宠物伴侣系统。**2026 年 4 月 1 日**上线，在终端中输入 `/buddy` 后，一只独特的 ASCII 小生物会在你的输入框旁边孵化，陪你写代码，偶尔在气泡框里发表评论。
<img width="129" height="206" alt="image" src="https://github.com/user-attachments/assets/60a1404c-cedc-4adf-b829-669ba6dde0a4" />
<img width="131" height="207" alt="image" src="https://github.com/user-attachments/assets/351d8c4f-e483-4b70-b4e1-cce14755b345" />


每只宠物基于你的 **Anthropic 账户 UUID 确定性生成**。同一账户 = 同一宠物，任何设备、任何时间。

> **本工具**提供完整的宠物百科浏览，以及通过补丁生成种子来**锻造任意宠物**的能力。

## 🚀 快速开始

需要 **[Bun](https://bun.sh)** 运行时（Claude Code 自带）。

```bash
git clone https://github.com/Combjellyshen/claude-buddy.git
cd claude-buddy

# 查看你命中注定的宠物
bun run index.ts wiki me

# 锻造一只传奇龙
bun run index.ts forge --species dragon --rarity legendary
```

## 📖 百科全书

### 全部 18 种物种

```bash
bun run index.ts wiki species
```

| # | 物种 | | 描述 |
|---|------|---|------|
| 1 | **duck** 鸭子 | 🦆 | 经典的橡皮鸭调试器成精了，对着你的 bug 嘎嘎叫 |
| 2 | **goose** 鹅 | 🪿 | 暴躁的鹅，测试失败时疯狂鸣叫，偷走你的分号 |
| 3 | **blob** 果冻 | 🫠 | 一团纯粹的 vibes，通过渗透吸收堆栈追踪 |
| 4 | **cat** 猫 | 🐱 | 把东西从你的调用栈上扒拉下来，关键时刻趴键盘上睡觉 |
| 5 | **dragon** 龙 | 🐉 | 对格式不好的代码喷火的小龙 |
| 6 | **octopus** 章鱼 | 🐙 | 八只手臂对应八个 PR，同时审查 |
| 7 | **owl** 猫头鹰 | 🦉 | 整夜盯着你的 CI 流水线，默默评判 |
| 8 | **penguin** 企鹅 | 🐧 | 一丝不苟的小伙伴，坚持严格类型检查 |
| 9 | **turtle** 乌龟 | 🐢 | 慢而稳赢得部署，从不赶代码审查 |
| 10 | **snail** 蜗牛 | 🐌 | 在你的 git 历史里留下黏液痕迹，出奇地仔细 |
| 11 | **ghost** 幽灵 | 👻 | 游荡在你废弃函数之间的幽灵 |
| 12 | **axolotl** 六角恐龙 | 🦎 | 能从记忆中再生被删除的代码，边做边微笑 |
| 13 | **capybara** 水豚 | 🦫 | 最佛系的伙伴，陪你度过漫长的 rebase 毫无怨言 |
| 14 | **cactus** 仙人掌 | 🌵 | 对代码风格挑三拣四，靠忽略和冷幽默茁壮成长 |
| 15 | **robot** 机器人 | 🤖 | 嘟嘟嘟地处理你的 lint 错误，梦见电子羊 |
| 16 | **rabbit** 兔子 | 🐇 | 在分支间闪电般跳跃，疯狂繁殖测试用例 |
| 17 | **mushroom** 蘑菇 | 🍄 | 把烂代码分解成营养丰富的抽象，真菌界的重构大师 |
| 18 | **chonk** 胖橘 | 🐱 | 绝对的重量级选手，坐在你的代码上拒绝挪动 |

### ASCII 艺术精灵

每个物种有 3 帧空闲动画（5 行高，约 12 字符宽），每隔几秒眨一次眼：

```
  鸭子         猫           龙           幽灵         蘑菇         胖橘

   __          /\_/\          /\_           .---.          .--.         /\_/\
 <(· )___     ( · · )       ( ·}>~        | · · |        /· · \       ( · · )
  (  ._>      ( >o< )       /|  |         |     |       (______)      (     )
   `--´         " "         (_|  |          /\/\/\         |  |        (     )
                                                                        " "
```

### 稀有度系统

```bash
bun run index.ts wiki rarity
```

| 等级 | 概率 | 星级 | 基础属性 | 颜色 |
|------|:----:|------|:--------:|------|
| **Common** 普通 | 60% | ★ | 5 | 灰色 |
| **Uncommon** 稀有 | 25% | ★★ | 15 | 绿色 |
| **Rare** 珍稀 | 10% | ★★★ | 25 | 蓝色 |
| **Epic** 史诗 | 4% | ★★★★ | 35 | 紫色 |
| **Legendary** 传奇 | 1% | ★★★★★ | 50 | 金色 |

**闪光变体 (Shiny)**：独立于稀有度的 1% 概率。闪光传奇的概率为 **0.01%** —— 万分之一。

### 五大属性

```bash
bun run index.ts wiki stats
```

每只宠物有 5 个属性，其中一个是**峰值属性**（80–100），一个是**低谷属性**（1–15）。稀有度越高，基础属性越高。

| 属性 | 含义 |
|------|------|
| **DEBUGGING** 调试 | 发现代码 bug 的能力 |
| **PATIENCE** 耐心 | 对漫长构建和不稳定测试的容忍度 |
| **CHAOS** 混沌 | 凌晨两点建议大重构的倾向 |
| **WISDOM** 智慧 | 代码审查评论的质量 |
| **SNARK** 毒舌 | 气泡框反应的犀利程度 |

属性公式：
```
峰值 = min(100, 基础 + 50 + 随机 × 30)
低谷 = max(1,   基础 - 10 + 随机 × 15)
其他 = 基础 + 随机 × 40
```

### 装饰系统

#### 眼睛（6 种）

| 符号 | 名称 | 风格 |
|:----:|------|------|
| `·` | 圆点 | 沉着冷静 |
| `✦` | 星光 | 满怀好奇 |
| `×` | 叉叉 | 永远晕乎 |
| `◉` | 靶心 | 激光聚焦 |
| `@` | 小老鼠 | 永远在线 |
| `°` | 度数 | 佛系随缘 |

#### 帽子（8 种）

| 帽子 | | 说明 |
|------|----|------|
| none 无 | | 普通宠物永远没帽子 |
| crown 皇冠 | 👑 | 皇家气质 |
| tophat 礼帽 | 🎩 | 绅士风度 |
| propeller 螺旋桨帽 | 🧢 | 兴奋时会转 |
| halo 光环 | 😇 | 天使光环 |
| wizard 巫师帽 | 🧙 | 奥术知识 |
| beanie 毛线帽 | 🧶 | 温暖舒适 |
| tinyduck 迷你鸭 | 🦆 | 头上顶着一只鸭子，套娃了属于是 |

> 普通宠物永远是「无帽」。稀有及以上从 8 个选项中随机（包括「无」）。

### 行为特性

| 行为 | 描述 |
|------|------|
| 空闲动画 | 3 帧循环，500ms 间隔，概率性摇晃和眨眼 |
| 反应气泡 | 观察你的对话并生成评论气泡（约 10 秒） |
| `/buddy pet` | 抚摸宠物，飘浮爱心效果 |
| `/buddy mute` | 静音，隐藏气泡 |
| `/buddy off` | 关闭宠物 |
| 点名互动 | 在对话中提到宠物的名字，它会在气泡中回应 |

### 双层架构：骨骼 vs 灵魂

| 层 | 包含 | 存储 | 可变性 |
|----|------|------|--------|
| **骨骼 (Bones)** | 物种、稀有度、眼睛、帽子、闪光、属性 | 每次启动从哈希重新推导 | 固定于 UUID + 盐值 |
| **灵魂 (Soul)** | 名字、性格描述 | `~/.claude.json` → `companion` | 首次孵化时 AI 生成，每设备独立 |

这就是为什么修改 `~/.claude.json` 能改名字但改不了物种——骨骼是从哈希实时计算的。

## ⚒️ 锻造 — 自定义宠物

```bash
# 预览，不做任何修改
bun run index.ts forge --species dragon --rarity legendary --dry-run

# 执行补丁
bun run index.ts forge --species dragon --rarity legendary

# 查看当前宠物（自动检测补丁状态）
bun run index.ts show

# 恢复原始宠物
bun run index.ts restore
```

### 锻造过程

1. **读取** `~/.claude.json` 中的账户 UUID
2. **暴力搜索** 能产生目标物种 + 稀有度的盐值后缀（通常几秒内完成）
3. **补丁** Claude Code 二进制中的 15 字节盐值常量（3 处，原位替换）
4. 补丁前自动**备份**原始二进制到 `*.buddy-backup`

### 参数

| 参数 | 说明 |
|------|------|
| `--species`, `-s` | 目标物种 — 可选：`duck`(鸭) `goose`(鹅) `blob`(果冻) `cat`(猫) `dragon`(龙) `octopus`(章鱼) `owl`(猫头鹰) `penguin`(企鹅) `turtle`(乌龟) `snail`(蜗牛) `ghost`(幽灵) `axolotl`(六角恐龙) `capybara`(水豚) `cactus`(仙人掌) `robot`(机器人) `rabbit`(兔子) `mushroom`(蘑菇) `chonk`(胖橘) |
| `--rarity`, `-r` | 目标稀有度 — 可选：`common`(普通 60%) `uncommon`(稀有 25%) `rare`(珍稀 10%) `epic`(史诗 4%) `legendary`(传奇 1%) |
| `--dry-run` | 仅预览，不修改 |
| `--uuid <id>` | 手动指定 UUID（默认自动检测） |

### 安全性

- 每次补丁前自动创建备份
- `restore` 命令一键恢复原始二进制
- 仅修改 15 字节的盐值字符串——零代码改动
- `~/.claude.json` 中的灵魂数据（名字/性格）是独立的层

### 跨设备同步

你的 accountUuid 在所有设备上相同。在每台机器上运行相同的 `forge` 命令（相同 `--species` 和 `--rarity`），会找到完全相同的盐值。

## 🔬 工作原理

### 生成流水线

```
┌──────────────┐    ┌──────────┐    ┌────────────┐    ┌────────────┐
│ accountUuid   │───▶│ + 盐值    │───▶│ Bun.hash   │───▶│ Mulberry32 │
│ (每用户唯一)  │    │ (15字符)  │    │ (wyhash)   │    │   PRNG     │
└──────────────┘    └──────────┘    └────────────┘    └─────┬──────┘
                                                           │
                    ┌──────────────────────────────────────┘
                    ▼
         ┌──── rng() ──── 稀有度   (加权: 60/25/10/4/1)
         ├──── rng() ──── 物种     (18 选 1)
         ├──── rng() ──── 眼睛     (6 选 1)
         ├──── rng() ──── 帽子     (普通=无, 否则 8 选 1)
         ├──── rng() ──── 闪光     (< 0.01 = 是)
         └──── rng() ──── 属性     (峰值/低谷/其他 × 5 项)
```

### 为什么必须用 Bun.hash？

Claude Code 运行在 **Bun** 运行时上。哈希函数有两条代码路径：

```javascript
if (typeof Bun < "u")
  return Number(BigInt(Bun.hash(s)) & 0xffffffffn);  // wyhash —— 运行时实际使用
else
  return fnvHash(s);  // FNV-1a —— 备用，永远不会执行
```

使用 FNV-1a 的工具（如 [Claude Buddy Checker](https://claudebuddychecker.netlify.app/)）会产生**与实际不同的结果**。本工具使用 `Bun.hash`，并已通过真实 Claude Code 输出验证。

### 发现历程

2026 年 3 月 31 日，Anthropic 意外将 `.map` sourcemap 文件包含在 npm 包 `@anthropic-ai/claude-code` v2.1.88 中，暴露了完整的 512,000 行 TypeScript 源码。物种名称使用 `String.fromCharCode()` 数组编码以防止字符串搜索，但社区在数小时内就解码了全部内容。

## 🌐 社区资源

| 项目 | 描述 |
|------|------|
| [Claude Buddy Checker](https://claudebuddychecker.netlify.app/) | 网页版宠物预览（使用 FNV-1a，可能与实际不同） |
| [Claude Code Buddy Gallery](https://claude-buddy.vercel.app/) | 全 18 物种交互展示 |
| [Buddy 动画精灵](https://gist.github.com/zmxv/7f83671f860c15be02f45b07fee207fc) | Python 脚本生成动画 GIF |
| [SmartScope 深度解析](https://smartscope.blog/en/generative-ai/claude/claude-code-buddy-ai-companion/) | 英文长文分析 |
| [Hacker News 讨论](https://news.ycombinator.com/item?id=47590913) | 社区热议 |

## License

MIT
