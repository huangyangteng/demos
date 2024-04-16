import  Koa from 'koa';
import  {koaBody} from 'koa-body';
import  path from 'path';
import  cors from 'koa2-cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import  Router from 'koa-router'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 10000

const app = new Koa()
// 使用koa-body中间件(用于处理数据请求)
app.use(
    koaBody({
        multipart: true, //支持文件上传
        formidable: {
            uploadDir: path.join(__dirname, '..', 'files'),
            keepExtensions: true,
            maxFieldsSize: 2 * 1024 * 1024
        }
    })
)

// 设置跨域
app.use(cors())

// 注册路由

const router=new Router()
const getRes=(data='success',code=2000)=>{
    return JSON.stringify({
        code,
        data
    })
}
const users=[
    {id:0,name:'Monica',role:'admin'},
    {id:1,name:'Jack',role:'admin'},
    {id:2,name:'Peter',role:'member'},
    {id:3,name:'Pepper',role:'member'},
    {id:4,name:'Joe',role:'member'},
    {id:5,name:'Wick',role:'admin'},
    {id:6,name:'Risa',role:'member'}
]
const details=[
    {
        sex:0,
        age:27,
        weight:50,
        picture:''
    },
    {
        sex:1,
        age:22,
        weight:65,
        picture:''
    },
    {
        sex:1,
        age:22,
        weight:65,
        picture:''
    },
    {
        sex:0,
        age:7,
        weight:10,
        picture:''
    },
    {
        sex:1,
        age:50,
        weight:80,
        picture:''
    },
    {
        sex:1,
        age:40,
        weight:75,
        picture:''
    },
    {
        sex:1,
        age:47,
        weight:68,
        picture:''
    },
]
router.get('/user/all',async ctx=>{
    await sleep(1000)
    ctx.body=getRes(users)
})
router.get('/user/detail/:id',async ctx=>{
    await sleep(1000)
    const user=users.find(item=>item.id==ctx.params.id) 
    if(!user){
        ctx.body=getRes('Unknown User Id')
    }else{

        ctx.body=getRes(Object.assign(user,details[user.id]))
    }
})
router.get('/user/query',async ctx=>{
    await sleep(1000)
    const { page=1,pageSize=5, name } = ctx.query;
    let filteredUsers = users;
    if (name) {
        filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }
    
    ctx.body=getRes({
        total:filteredUsers.length,
        users:filteredUsers.slice((page-1)*pageSize,page*pageSize)
    })
})

router.post('/user/add', async ctx => {
    await sleep(1000)
    const { id=users.length+1, name, password, role } = ctx.request.body;
    const newUser={ id, name, password, role }
    users.push(newUser);
    ctx.body = getRes(newUser);
});

router.put('/user/update', async ctx => {
    await sleep(1000)
    const { id, name, password, role } = ctx.request.body;
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        const newUser={ id, name, password, role }
        users[index] =newUser ;
        ctx.body = getRes(newUser);
    } else {
        ctx.body = getRes('User not found', 5000);
    }
});

router.post('/user/delete', async ctx => {
    await sleep(1000)
    const { id } = ctx.request.body;
    const index = users.findIndex(user => user.id == id);
    if (index !== -1) {
        users.splice(index, 1);
        ctx.body = getRes(id);
    } else {
        ctx.body = getRes('User not found', 5000);
    }
});
app.use(router.routes())

app.listen(PORT)
console.log('Server running on port  http://localhost:' + PORT + '  ')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}