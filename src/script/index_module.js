define(['jlazyload'], () => {
    return {
        init: function() {
            //渲染+懒加载
            const $list = $('.list');``
            $.ajax({
                url: 'http://10.31.161.123:83/dashboard/weipinhui/php/index.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    // $strhtml += `
                    //     <li>

                    //             <img class="lazy" data-original="${value.src}" width="200" height="200"/>
                    //             <span>${value.title}</span>
                    //             <p>￥${value.discount}</p>
                    //     </li>
                    // `;


                    // $strhtml += `
                    // <li>
                    // <a class="listboxer" href="detail.html?sid=${value.sid}">
                    //     <img class="lazy" data-original="${value.src}"/>

                    //     <span class="temaijiaa">特卖价</span>
                    //     <p>
                    //     <span class="newprice">￥${value.newprice},￥${value.oldprice},${value.discount}折</span>
                    //     </p>
                    //     <p>${value.title}</p>
                    // </a>
                    // </li>
                    // `;

                    $strhtml += `
                    <li>
                    <a class="listboxer" href="detail.html?sid=${value.sid}">
                        <img class="lazy" data-original="${value.src}"/>
                        <div class="xuanrantitle">
                            <div class="temaijiaa">特卖价</div>
                            <p class="ppp">
                            <span class="newprice">￥${value.newprice}</span>
                            <span class="oldprice">￥${value.oldprice}</span>
                            <span class="discount">${value.discount}.6</span>
                            <span class="zhe">折</span>
                            
                            </p>
                        </div>
                        
                        <p class="listtitle">${value.title}</p>
                    </a>
                    </li>
                    `;

                });
                $list.html($strhtml);
                //渲染的下面进行懒加载操作
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });





            // 由此开始
            const $lunbo = $('.lunbo');
            const $piclist = $('.lunbo ul li');
            const $btnlist = $('.lunbo ol li');
            const $left = $('#left');
            const $right = $('#right');
            let $num = 0;
            let $timer1 = null;
            let $timer2 = null;
            //1.小圆圈切换
            $btnlist.on('mouseover', function() {
                $num = $(this).index();
                $timer1 = setTimeout(function() {
                    tabswitch()
                }, 300);


            });

            $btnlist.on('mouseout', function() {
                clearTimeout($timer1);
            });

            //2.左右箭头切换
            $right.on('click', function() {
                $num++;
                if ($num > $btnlist.length - 1) {
                    $num = 0;
                }

                tabswitch()
            });

            $left.on('click', function() {
                $num--;
                if ($num < 0) {
                    $num = $btnlist.length - 1;
                }

                tabswitch()
            });

            function tabswitch() {
                $btnlist.eq($num).addClass('active').siblings().removeClass('active');
                $piclist.eq($num).stop(true).animate({
                    opacity: 1
                }).siblings().stop(true).animate({
                    opacity: 0
                });
            }

            //3.自动轮播
            $timer2 = setInterval(function() {
                $right.click();
            }, 3000);

            //4.鼠标控制定时器停止和开启。
            $lunbo.hover(function() {
                clearInterval($timer2);
            }, function() {
                $timer2 = setInterval(function() {
                    $right.click();
                }, 3000);
            });

            // 当鼠标移入lunbopic-center中left和right出现
            const $lunbobox = $('.lunbopic-center');
            $lunbobox.on("mouseover", function() {
                // alert("1");
                $left.css({ "display": "block" });
                $right.css({ "display": "block" });
            })
            $lunbobox.on("mouseout", function() {
                    // alert("1");
                    $left.css({ "display": "none" });
                    $right.css({ "display": "none" });
                })
                // 由此结束

        }
    }
});