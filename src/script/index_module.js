define(['jlazyload'], () => {
    return {
        init: function() {
            //渲染+懒加载
            const $list = $('.list123');
            $.ajax({
                url: 'http://localhost/dashboard/weipinhui/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
 
                                <img class="lazy" data-original="${value.src}" width="200" height="200"/>
                                <span>${value.title}</span>
                                <p>￥${value.num}</p>
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