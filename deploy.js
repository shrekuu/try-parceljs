const fs = require('fs-extra');
const {
    prompt
} = require('inquirer');
const {
    execSync
} = require('child_process')

// 将视图与静态资源从编译目录移动到 wordpress 站点需要的位置
// 移动前需要确认文件覆盖
const paths = {
    dist: {
        assetsDir: './dist/assets',
        viewsDir: './dist/views'
    },
    deploy: {
        assetsDir: '../assets',
        viewsDir: '../templates'
    }
}

// 问一下是否确定覆盖布署目录
prompt({
    type: 'input',
    name: `confirm_override_deploy_dirs`,
    message: `确认覆盖目录 ${paths.deploy.assetsDir}, ${paths.deploy.viewsDir} 吗?[y|n]`,
    default: 'y'
}).then(answers => {

    console.log(answers.confirm_override_deploy_dirs);

    if (answers.confirm_override_deploy_dirs === 'y') {

        // 编译
        execSync('npm run build', {
            stdio: 'inherit'
        });

        // 移动到布署目录
        fs.moveSync(paths.dist.assetsDir, paths.deploy.assetsDir, {
            overwrite: true
        });

        fs.moveSync(paths.dist.viewsDir, paths.deploy.viewsDir, {
            overwrite: true
        });
    }
});