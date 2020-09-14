const urllib = jest.genMockFromModule('urllib')

let index = 0
async function request(url, options){

    if(url.startsWith('bad url')){
        return {status:404}
    }

    if(url.startsWith('http://one')){
        return {status:200, data:{a:0, b:1}}
    }

    if( index ++ == 0 ){
        return {status:200, data:{a:1, b:2}}
    }else{
        return {status:200, data:{a:-1, c:3}}
    }
}

urllib.request = request

module.exports = urllib