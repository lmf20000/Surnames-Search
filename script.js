// 等待 DOM 完全加载后再执行脚本
// 本脚本实现百家姓搜索功能，增强PWA适配性，自动检测浏览器并引导用户添加到主屏幕/桌面

document.addEventListener('DOMContentLoaded', function() {
    // 获取输入框、查询按钮和姓氏容器的 DOM 元素引用
    const input = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const container = document.getElementById('surnamesContainer');
    // 获取自定义弹窗相关元素
    const customModal = document.getElementById('customModal');
    const customModalMsg = document.getElementById('customModalMsg');
    const customModalBtn = document.getElementById('customModalBtn');
    // 获取PWA引导条相关元素
    const pwaGuideBar = document.getElementById('pwaGuideBar');
    const pwaGuideMsg = document.getElementById('pwaGuideMsg');
    const pwaGuideClose = document.getElementById('pwaGuideClose');

    // 百家姓列表，包含单姓和复姓
    const surnames = [
        "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "褚", "卫", "蒋", "沈", "韩", "杨",
        "朱", "秦", "尤", "许", "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", "陶", "姜",
        "戚", "谢", "邹", "喻", "柏", "水", "窦", "章", "云", "苏", "潘", "葛", "奚", "范", "彭", "郎",
        "鲁", "韦", "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳", "酆", "鲍", "史", "唐",
        "费", "廉", "岑", "薛", "雷", "贺", "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
        "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", "元", "卜", "顾", "孟", "平", "黄",
        "和", "穆", "萧", "尹", "姚", "邵", "湛", "汪", "祁", "毛", "禹", "狄", "米", "贝", "明", "臧",
        "计", "伏", "成", "戴", "谈", "宋", "茅", "庞", "熊", "纪", "舒", "屈", "项", "祝", "董", "梁",
        "杜", "阮", "蓝", "闵", "席", "季", "麻", "强", "贾", "路", "娄", "危", "江", "童", "颜", "郭",
        "梅", "盛", "林", "刁", "钟", "徐", "邱", "骆", "高", "夏", "蔡", "田", "樊", "胡", "凌", "霍",
        "虞", "万", "支", "柯", "昝", "管", "卢", "莫", "经", "房", "裘", "缪", "干", "解", "应", "宗",
        "丁", "宣", "贲", "邓", "郁", "单", "杭", "洪", "包", "诸", "左", "石", "崔", "吉", "钮", "龚",
        "程", "嵇", "邢", "滑", "裴", "陆", "荣", "翁", "荀", "羊", "於", "惠", "甄", "曲", "家", "封",
        "芮", "羿", "储", "靳", "汲", "邴", "糜", "松", "井", "段", "富", "巫", "乌", "焦", "巴", "弓",
        "牧", "隗", "山", "谷", "车", "侯", "宓", "蓬", "全", "郗", "班", "仰", "秋", "仲", "伊", "宫",
        "宁", "仇", "栾", "暴", "甘", "钭", "厉", "戎", "祖", "武", "符", "刘", "景", "詹", "束", "龙",
        "叶", "幸", "司", "韶", "郜", "黎", "蓟", "薄", "印", "宿", "白", "怀", "蒲", "邰", "从", "鄂",
        "索", "咸", "籍", "赖", "卓", "蔺", "屠", "蒙", "池", "乔", "阴", "鬱", "胥", "能", "苍", "双",
        "闻", "莘", "党", "翟", "谭", "贡", "劳", "逄", "姬", "申", "扶", "堵", "冉", "宰", "郦", "雍",
        "郤", "璩", "桑", "桂", "濮", "牛", "寿", "通", "边", "扈", "燕", "冀", "郏", "浦", "尚", "农",
        "温", "别", "庄", "晏", "柴", "瞿", "阎", "充", "慕", "连", "茹", "习", "宦", "艾", "鱼", "容",
        "向", "古", "易", "慎", "戈", "廖", "庾", "终", "暨", "居", "衡", "步", "都", "耿", "满", "弘",
        "匡", "国", "文", "寇", "广", "禄", "阙", "东", "欧", "殳", "沃", "利", "蔚", "越", "夔", "隆",
        "师", "巩", "厍", "聂", "晁", "勾", "敖", "融", "冷", "訾", "辛", "阚", "那", "简", "饶", "空",
        "曾", "毋", "沙", "乜", "养", "鞠", "须", "丰", "巢", "关", "蒯", "相", "查", "后", "荆", "红",
        "游", "竺", "权", "逯", "盖", "益", "桓", "公", "晋", "楚", "闫", "法", "岳", "帅", "缑", "亢", 
        "况", "后", "有", "琴", "商", "牟", "佘", "佴", "墨", "哈", "谯", "笪", "年", "爱", "阳", "佟",
        "言", "福", "仉", "督",
        // 复姓
        "万俟", "司马", "上官", "欧阳", "夏侯", "诸葛", "闻人", "东方", "赫连", "皇甫",
        "尉迟", "公羊", "澹台", "公冶", "宗政", "濮阳", "淳于", "单于", "太叔", "申屠",
        "公孙", "仲孙", "轩辕", "令狐", "钟离", "宇文", "长孙", "慕容", "鲜于", "闾丘",
        "司徒", "司空", "亓官", "司寇", "子车", "颛孙", "端木", "巫马", "公西", "漆雕",
        "乐正", "壤驷", "公良", "拓跋", "夹谷", "宰父", "谷梁", "汝鄢", "涂钦", "段干",
        "百里", "东郭", "南门", "呼延", "归海", "羊舌", "微生", "梁丘", "左丘", "东门",
        "西门", "伯赏", "南宫", "第五"
    ];

    /**
     * 渲染所有姓氏到页面
     */
    function renderSurnames() {
        container.innerHTML = surnames.map(s => `<span class="surname">${s}</span>`).join('');
    }

    /**
     * 显示自定义弹窗
     */
    function showModal(msg) {
        customModalMsg.textContent = msg;
        customModal.style.display = 'flex';
    }
    // 关闭弹窗
    customModalBtn.onclick = function() {
        customModal.style.display = 'none';
    };
    // 支持点击弹窗外区域关闭
    customModal.onclick = function(e) {
        if (e.target === customModal) customModal.style.display = 'none';
    };

    /**
     * PWA 适配性检测与引导
     */
    function isInStandaloneMode() {
        // 判断是否已安装为PWA
        return (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true);
    }
    function isWeixinOrQQ() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('micromessenger') !== -1 || ua.indexOf('qq/') !== -1;
    }
    function isAndroid() {
        return /android/i.test(navigator.userAgent);
    }
    function isIOS() {
        return /iphone|ipad|ipod/i.test(navigator.userAgent);
    }
    function isSafari() {
        return /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);
    }
    function isChrome() {
        return /chrome/i.test(navigator.userAgent) && !/edge/i.test(navigator.userAgent);
    }
    function isEdge() {
        return /edg/i.test(navigator.userAgent);
    }
    function showPwaGuide(msg) {
        pwaGuideMsg.innerHTML = msg;
        pwaGuideBar.style.display = 'flex';
    }
    pwaGuideClose.onclick = function() {
        pwaGuideBar.style.display = 'none';
    };

    // 只在未安装PWA时显示引导
    if (!isInStandaloneMode()) {
        if (isWeixinOrQQ()) {
            showPwaGuide('当前浏览器不支持"添加到主屏幕"功能，请点击右上角菜单，选择"在浏览器中打开"，再用 Chrome 或 Safari 访问本网站以获得最佳体验。');
        } else if (isAndroid() && isChrome()) {
            showPwaGuide('点击浏览器右上角菜单，选择"添加到主屏幕"或"安装应用"，即可像App一样使用。');
        } else if (isIOS() && isSafari()) {
            showPwaGuide('点击底部分享按钮，选择"添加到主屏幕"，即可像App一样使用。');
        } else if (isEdge()) {
            showPwaGuide('点击地址栏右侧"安装"图标，可将本应用安装到桌面。');
        } else {
            showPwaGuide('如需获得最佳体验，建议使用 Chrome、Edge 或 Safari 浏览器，并通过菜单添加到主屏幕/桌面。');
        }
    }

    /**
     * 搜索并只高亮第一个匹配的姓氏，若无匹配则弹窗提示
     */
    function search() {
        const query = input.value.trim();
        const surnameElements = container.getElementsByClassName('surname');
        let firstMatch = null; // 记录第一个匹配项

        // 先移除所有高亮
        for (let el of surnameElements) {
            el.classList.remove('highlight');
        }

        // 遍历所有姓氏元素，找到第一个匹配项
        for (let el of surnameElements) {
            if (query && el.textContent.includes(query)) {
                firstMatch = el;
                break;
            }
        }

        // 只高亮并跳转到第一个匹配项
        if (firstMatch) {
            firstMatch.classList.add('highlight');
            firstMatch.scrollIntoView({ behavior: 'auto', block: 'center' });
        } else if (query) {
            showModal(`未能查询到姓氏：<${query}>，请检查输入或尝试其他拼写。`);
        }
    }

    // 绑定"查询"按钮点击事件
    searchBtn.addEventListener('click', search);

    // 绑定输入框回车事件
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            search();
        }
    });

    // 页面加载后渲染所有姓氏
    renderSurnames();
}); 