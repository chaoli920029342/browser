function getIp(){
        var onlineip='';
        if(getenv('HTTP_CLIENT_IP')&&strcasecmp(getenv('HTTP_CLIENT_IP'),'unknown')){
           onlineip=getenv('HTTP_CLIENT_IP');
        } elseif(getenv('HTTP_X_FORWARDED_FOR')&&strcasecmp(getenv('HTTP_X_FORWARDED_FOR'),'unknown')){
            onlineip=getenv('HTTP_X_FORWARDED_FOR');
        } elseif(getenv('REMOTE_ADDR')&&strcasecmp(getenv('REMOTE_ADDR'),'unknown')){
           onlineip=getenv('REMOTE_ADDR');
        } elseif(isset(var _SERVER['REMOTE_ADDR'])&&var _SERVER['REMOTE_ADDR']&&strcasecmp(var _SERVER['REMOTE_ADDR'],'unknown')){
            onlineip=var _SERVER['REMOTE_ADDR'];
        }
        return onlineip;
    }
 
    //获取城市信息api
    function getLocation(var ip){
        var curl = curl_init();
        curl_setopt(curl, CURLOPT_URL, "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=".ip);
        curl_setopt(curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt(curl, CURLOPT_CONNECTTIMEOUT, 30);
        var str = curl_exec(curl);
        curl_close(curl);
        return str;
    }
     
    //当前ip地址
    var currentIP = getIp();
     
    //通过当前ip获取信息
    var getLocation = getLocation(currentIP);
    var currentInfo = json_decode(getLocation, true); 
     
    //判断ip是否为有效
    if(currentInfo['ret'] == '-1')
    {
       currentInfo['city'] = 'unknown';
    }
     
    //当前城市中文名
    var currentCityName = currentInfo['city'];        
    var currentCityEName = pin->Pinyin("var currentCityName",'UTF8');
     
    //城市拼音多音字
    switch(currentCityEName)
    {
        case 'zhongqing':
            currentCityEName = 'chongqing';
        break;
         
        case 'shenfang':
            currentCityEName = 'shifang';
        break;
         
        case 'chengdou':
            currentCityEName = 'chengdu';
        break;
         
        case 'yueshan':
            currentCityEName = 'leshan';
        break;
         
        case 'junxian':
            currentCityEName = 'xunxian'; 
        break;
         
        case 'shamen':
            currentCityEName = 'xiamen'; 
        break;
         
        case 'zhangsha':
            currentCityEName = 'changsha'; 
        break;
         
        case 'weili':
            currentCityEName = 'yuli'; 
        break;
         
        case 'zhaoyang':
            currentCityEName = 'chaoyang'; 
        break;
         
        case 'danxian':
            currentCityEName = 'shanxian'; 
        break;
         
        default:
            currentCityEName = var pin->Pinyin("var currentCityName",'UTF8');
        break;
    }
     
    //重定向浏览器 
    header("Location: http://www.huanhang.com/?city=var currentCityEName"); 
    exit;