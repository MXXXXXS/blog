import * as tcb from 'tcb-js-sdk'

const app = tcb.init({
  env: "suger-aqua-coffee-fc9ef"
})

const auth = app.auth()

async function login(){
  await auth.signInAnonymously();
  // 匿名登录成功检测登录状态isAnonymous字段为true
  // const loginState = await auth.getLoginState();
  // // 1. 建议登录前检查当前是否已经登录
  // if(!loginState){
    // 2. 请求开发者自有服务接口获取ticket
    const ticket = await fetch('https://suger-aqua-coffee-fc9ef.service.tcloudbase.com/ticketGen', {
      mode: 'cors'
    })
    const ticketString = await ticket.text()
    console.log(ticketString)
    // 3. 登录 Cloudbase
    await auth.signInWithTicket(ticketString);
  // }
  console.log(loginState.isAnonymous); // true
  


  // const db = app.database()
  // const collection = db.collection("suger-aqua-coffee-comments")
  // const commentsDoc = collection.doc("comments")
  // const result = await commentsDoc.update({
  //   data: {
  //     style: {
  //       color: 'red'
  //     }
  //   }
  // }).catch(err => console.error(err))
  // console.log(result);
  
}

login();


