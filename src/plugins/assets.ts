import '@/styles/global.less'

function naiveStyleOverride(){
    const meta = document.createElement('meta')
    meta.name='naive-ui-style'
    document.head.appendChild(meta)
}

function setupAssets(){
    naiveStyleOverride()
}
export default setupAssets