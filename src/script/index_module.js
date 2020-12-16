define(['jlazyload'], () => {
    return {
        init: function() {
            //渲染+懒加载
            const $list = $('.list');
            $.ajax({
                url: 'http://10.31.161.123/dashboard/weipinhui/php/listdata.php',
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


                    $strhtml += `
                    <li>
                    <a href="detail.html?sid=${value.sid}">
                        <img class="lazy" data-original="${value.src}"/>
                        <p>${value.title}</p>
                        <span>￥${value.newprice}</span>
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
        }
    }
});