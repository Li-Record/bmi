window.addEventListener('load', function(e) {

    var bmiBtn = document.getElementById('bmiBtn');
    var hData = document.getElementById('height');
    var wData = document.getElementById('weight');
    var bmiData = JSON.parse(localStorage.getItem('bmi')) || [];
    var content = document.querySelector('.content');

    // 一開始就從 localstorage 中取資料
    function updateData() {
        var str = '';
        if (bmiData.length == 0) {
            str += '<h3>請輸入身高體重</h3>';
            content.innerHTML = str;
            return;
        } else {
            for (var i = 0; i < bmiData.length; i++) {
                str += '<li class="' + bmiData[i].class + '" data-num="'+i+'"><h4>' + bmiData[i].status + '</h4><div class="listInf"><h5>BMI</h5><p>' + bmiData[i].value + '</p></div><div class="listInf"><h5>weight</h5><p>' + bmiData[i].weight + '</p></div><div class="listInf"><h5>height</h5><p>' + bmiData[i].height + '</p></div><p class="time">' + bmiData[i].date + '</p><a href="#">刪除</a><div class="clear"></div></li>'
            }
        }

        content.innerHTML = '<h3>BMI 紀錄</h3><ul>' + str + '</ul><div class="clear" />';
    }
    // 初始化 先更新一次頁面
    updateData();

    // BMI 計算
    // 建立 BMI 物件
    function bmiCount(h, w) {
        var bmi = {};
        var today = new Date();
        bmi.value = w / ((h / 100) * (h / 100));
        bmi.value = bmi.value.toFixed(2); // 只取到小數點後兩位
        bmi.weight = w + 'kg';
        bmi.height = h + 'cm';
        bmi.date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();

        switch (true) {
            case bmi.value < 18.5:
                bmi.class = 'light';
                bmi.status = '過輕';

                break;
            case 24 > bmi.value && bmi.value >= 18.5:
                bmi.class = 'ideal';
                bmi.status = '理想';
                break;
            case 27 > bmi.value && bmi.value >= 24:
                bmi.class = 'heavy';
                bmi.status = '過重';
                break;
            case 30 > bmi.value && bmi.value >= 27:
                bmi.class = 'mild';
                bmi.status = '輕度肥胖';
                break;
            case 35 > bmi.value && bmi.value >= 30:
                bmi.class = 'moderate';
                bmi.status = '中度肥胖';
                break;
            case bmi.value >= 35:
                bmi.class = 'severe';
                bmi.status = '重度肥胖';
                break;
        }
        return bmi;
    }

    // 取得輸入資料並放入 localstorage
    function getInput(e) {
        var r = /^[0-9]*[1-9][0-9]*$/;
        if (!r.test(hData.value) || !r.test(wData.value)) {
            alert('請輸入數字');
            return;
        } else if (hData.value.length > 3 || wData.value.length > 3) {
            alert('最多填入 3 位數');
            return;
        } else {
            bmiData.push(bmiCount(hData.value, wData.value));
            localStorage.setItem('bmi', JSON.stringify(bmiData));
            updateData();
        }
    }

    bmiBtn.addEventListener('click', getInput, false);

    // 刪除 localstorage 該筆資料後更新頁面;
    function removeData(e){
        if( e.target.nodeName !== 'A'){return}
        e.preventDefault();
        var num = e.target.parentNode.dataset.num;
        bmiData.splice(num, 1);
        localStorage.setItem('bmi', JSON.stringify(bmiData));
        updateData();
    }

    content.addEventListener('click', removeData, false);

}, false)