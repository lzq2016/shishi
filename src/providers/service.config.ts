export class ServiceConfig {
    private static ISDEBUG = false;
    public static PAGESIZE = 10;
    public static appVersion = "1.0"
    public static getUrl() {
        if (this.ISDEBUG) {
            //测试环境URL
            return "https://juyaer.com/";
        } else {
            //生产环境URL
            return "https://juyaer.com/";
        }

    }

    public static LOGIN = "api/v1/entry/signin/"; //登录
    public static TOKENAUTH = "api/v1/api-token-auth/"; //登录
    public static SIGNUP = "api/v1/entry/signup/"; //注册
    public static SENDCODE = "api/v1/entry/send_code/"; //获取验证码
    public static VERIFYUSERSIGNUP = "api/v1/entry/verify_user_signup/"; //获取验证码
    public static CHANGEPASSWORD = "api/v1/entry/verify_user_forget_pwd/"; //重置密码
    public static LOGOUT = "api/v1/entry/logout/"; //注销
    public static OPERATIONSELECTED = "api/v1/operation/selected/"; //精选
    public static HOMEFEED = "api/v1/feed/"; //首页feed流
    public static HOMETAGFEED = "api/v1/feed/tag_feed/"; //首页tab feed流
    public static TOPICFEED = "api/v1/feed/topic_feed/";
    public static SLIDE = "api/v1/slide/"; //轮播
    public static ACTION = "api/v1/action/"; //某人动态
    public static GETUSERDETAIL = "api/v1/entry/"; //个人空间数据
    public static INTERESTED = "api/v1/follow/interested/"; //可能感兴趣的人
    public static FOLLOWUSER = "api/v1/follow/follow_user/"; //关注
    public static ISATTENTION = "api/v1/follow/is_follower/"; //是否关注
    public static CANCELATTENTION = "api/v1/follow/cancel_idol/"; //取消关注
    public static HOTPEOPLE = "api/v1/feed/hot_user/"; 
    public static TOPICLIST = "api/v1/topic/"; 
    public static MAKECOLLECT = "api/v1/collect/"; //收藏
    public static CANCELCOLLECT = "api/v1/collect/delete/"; //取消收藏
    public static MAKELIKE = "api/v1/like/";  //点赞
    public static CANCELLIKE = "api/v1/like/delete/";  //取消点赞

}
