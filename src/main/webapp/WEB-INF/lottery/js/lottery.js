var getAllUserInfo = [];
var luckyUser = null;
var setintIndex = 0;
function getRandom(min, max) {
    var r = Math.random() * (max - min);
    var re = Math.round(r + min);
    re = Math.max(Math.min(re, max), min)

    return re;
}
//获取用户
var getLottery = function () {
    //出现正在获取最新签到成员，请稍候...
    var getUserList = BaseUrl + "user/userList";
    $.ajax({
        async: true,
        url: getUserList,
        success: function (data) {
            getAllUserInfo = data.data;
        }
    })
}


var isAuto = function () {

    setintIndex = setInterval(function () {
        var user_index = getRandom(0, 500);

        $("#userName").html(getAllUserInfo[user_index].name);
        $("#userImg").attr("src", getAllUserInfo[user_index].headImgUrl);

    }, 100);

    beginLuck();
    $('#lottery .condition').addClass('disabled');
    return false;
}
var beginLuck = function () {  //key 0:只抽一个人奖 1:自动抽奖

    $("#stopLuck").show();
    $("#beginLuck").hide();


}

//停止抽奖
var stopLuck = function () {
    //
    clearInterval(setintIndex);
//后台选择
    var luckyLevel = $("select[name='prize']").val();
    var userNum = $("select[name='userNum']").val();
    var getLotteryUser = BaseUrl + "user/lotterySelect";
    $.ajax({
        url: getLotteryUser,
        success: function (data) {
            luckyUser = data.data;
            luckyUser = luckyUser;
            $("#userName").html(luckyUser.name);
            $("#userImg").attr("src", luckyUser.headImgUrl);
            var userName = luckyUser.name;
            var imgUl = luckyUser.headImgUrl;
            showLuckAnimate(imgUl, luckyLevel, userName);
            var listContent = $("<li></li>").addClass("list-content clearfix");
            var listIdx = $("<div></div>").addClass("list-idx").text(1);
            var listUser = $("<div></div>").addClass("list-user");
            var jqImg = $("<img>").attr("src", imgUl);
            var jqName = $("<p></p>").addClass("text-overflow").text(userName);
            var jqPrize = $("<div></div>").addClass("list-prize-name text-overflow").text(luckyLevel);
            listUser.append(jqImg).append(jqName);
            listContent.append(listIdx).append(listUser).append(jqPrize);

            $("#luckyUser").find("ul").prepend(listContent);
        }
    })


    /*setInterval(function () {
     $("#userName").html(luckyUser[index].name);
     $("#userImg").attr("src", luckyUser[index].headImgUrl);
     console.log("恭喜您中奖了" + data[index]);
     showLuckAnimate(luckyUser[index].headImgUrl, "一等奖", luckyUser[index].name);
     index += 1;
     }, 1000);*/

    $("#beginLuck").show();
    $("#stopLuck").hide();
    return false;
}


//显示抽奖动画
var showLuckAnimate = function (imgUl, showLevel, userName) {
    $('body').append('<div class="animate-bg"><div class="light"></div><img class="luckbg" src="images/luckbg.png" /><img src="' + imgUl + '" class="luckUserHead" /><div class="showLuckUserName">' + userName + '</div><div class="showLuckLevel">恭喜<span>' + userName + '</span> 获<span>' + showLevel + '</span>！</div></div>');
    $(".luckbg").animate({
        "width": "800px",
        "height": "518px",
        "margin-top": "-330px",
        "margin-left": "-400px",
        "opacity": "1"
    }, "fast");
    $(".luckUserHead").animate({"margin-top": "-275px"});
    $(".showLuckLevel").animate({"margin-top": "40px"});
    $(".showLuckUserName").animate({"opacity": "1"});
    setTimeout(function () {
        $(".animate-bg").animate({"opacity": "0"}, "slow", function () {
            $(".animate-bg").remove();
        });
        $("#bgsound").remove();
    }, 3000);
}
