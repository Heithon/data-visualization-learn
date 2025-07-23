const data = [
  // 数据集
  { name: "questions", value: 17 },
  { name: "schools", value: 25 },
  { name: "philosophers", value: 35 },
];

const chartWidth = 400; // 图表宽度
const chartHeight = 300; // 图表高度
const margin = 15; // 图表外边距

const containerWidth = chartWidth + margin * 2; // 容器宽度
const containerHeight = chartHeight + margin * 2; // 容器高度

const names = Array.from(data, (item) => item.name); // 获取数据集中的名称
const values = Array.from(data, (item) => item.value); // 获取数据集中的值
const indices = Array.from(data, (_, i) => i); // 获取数据集中的索引

const step = chartWidth / names.length; // 计算每个柱子的宽度
const barWidth = step * 0.8; // 计算每个柱子的宽度
const xs = Array.from(indices, (i) => i * step); // 计算每个柱子的x坐标
const y = chartHeight; // 计算每个柱子的y坐标

const vmax = Math.max(...values); // 计算数据集中的最大值
const barHeights = Array.from(values, (v) => chartHeight * (v / vmax)); // 计算每个柱子的高度

// 颜色
const nameColor = {
  questions: "#5B8FF9",
  philosophers: "#61DDAA",
  schools: "#65789B",
};

const barColors = Array.from(names, (name) => nameColor[name]); // 获取每个柱子的颜色

const canvas = document.getElementById("container-canvas");
canvas.style.height = containerHeight + "px";
canvas.style.width = containerWidth + "px";

canvas.width = containerWidth * 2;
canvas.height = containerHeight * 2; // 设置为2倍，防止模糊

const context = canvas.getContext("2d");
// console.log("canvas", context);
context.scale(2, 2); // 抵消将画布宽高设置为样式宽高两倍的影响
context.translate(margin, margin); // 将画布的绘制区域向右下角移动

for (const index of indices) {
  const color = barColors[index];
  const x = xs[index];
  const barHeight = barHeights[index];
  const value = values[index];

  context.fillStyle = color;
  context.fillRect(x, y - barHeight, barWidth, barHeight); // 绘制矩形context.fillRect(x, y - barHeight, barWidth, barHeight);

  // 绘制值
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  context.font = "25px PingFangSC-Regular, sans-serif";
  context.fillText(value, x + barWidth / 2, y - barHeight / 2);
}
