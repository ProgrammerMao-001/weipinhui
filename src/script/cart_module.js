define(['jcookie'], () => {
    return {
        init: function() {
            //1.获取cookie
            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    let $arrsid = $.cookie('cookiesid').split(','); //[1,3,5]
                    let $arrnum = $.cookie('cookienum').split(','); //[10,33,50]
                    $.each($arrsid, function(index, value) {
                        rendergoods($arrsid[index], $arrnum[index]); //index:数组的索引
                    });
                }
            }
            getcookietoarray();
            //2.渲染商品列表
            function rendergoods(sid, num) { //sid:商品的编号    num:商品的数量
                //获取所有的接口数据
                $.ajax({
                    url: 'http://10.31.161.123/dashboard/weipinhui/php/alldata.php',
                    dataType: 'json'
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        if (sid === value.sid) { //通过sid的对比找到对应的数据。
                            let $clonebox = $('.goods-item:hidden').clone(true, true); //克隆
                            $clonebox.find('.goods-pic img').attr('src', value.src);
                            $clonebox.find('.goods-d-info a').html(value.title);
                            $clonebox.find('.b-price strong').html(value.newprice);
                            $clonebox.find('.quantity-form input').val(num);
                            // $clonebox.find(".price-sum totalprice").html(value.sid) // 123
                            $clonebox.find('.b-sum strong').html((value.newprice * num).toFixed(2));
                            $clonebox.css('display', 'block'); //显示
                            $('.item-list').append($clonebox); //追加
                        }
                    });
                });
            }

        }
    }
});