import React,{ useEffect, useCallback, useMemo, useState} from 'react'
import { Select, Table } from 'antd'
import _ from 'lodash'
import useAsync from './2-useAsync'

// 需求：
// 为了让你对这一点有更直观的感受，我们来看一个例子。
//     设想现在有这样一个需求：我们需要展示一个博客文章的列表，并且有一列要显示文章的分类。
//     同时，我们还需要提供表格过滤功能，以便能够只显示某个分类的文章。
//     为了支持过滤功能，后端提供了两个 API：一个用于获取文章的列表，另一个用于获取所有的分类。
//     这就需要我们在前端将文章列表返回的数据分类 ID 映射到分类的名字，以便显示在列表里


const endpoint = "https://reqres.in/api";
const useArticles = () => {
    // 使用上面创建的 useAsync 获取文章列表
    const {execute, data, loading, error} = useAsync(
        useCallback(
            async () => {
                const res = await fetch(`${endpoint}/posts`)  // 文章列表
                return res.json()
        }, []) 
    )
    // 执行异步调用
    useEffect(() => {execute()}, [])
    // 返回语义化的数据结构
    return {
        articles: data,
        articlesLoading: loading,
        articlesError: error
    }
} 
const useCategories = () => {
    // 使用上面创建的 useAsync 获取分类列表 
    const {execute, data, loading, error} = useAsync(
        useCallback(async () => {
            const res = await fetch(`${endpoint}/categories`)  // 分类列表 
            return res.json()
        }, [])
    )
    // 执行异步调用
    useEffect(() => {execute()}, [])
    // 返回语义化的数据结构
    return {
        categories: data,
        categoriesError: loading,
        articleError: error
    }
}

const useCombinedArticles = (articles, categories) => {
    // 将文章数据和分类数据组合到一起
    return useMemo(() => {
        if(!articles || !categories) return null
        return articles.map(article => { 
            return {
                ...article,
                category: categories.find( c => String(c.id) === String(article.id))
            }
        })
    }, [articles, categories])
}

const useFilteredArticles = (articles, selectedCategory) => {
    // 实现按照分类过滤
    return useMemo( () => {
        if(!articles) return null
        if(!selectedCategory) return articles;
        return articles.filter( article => {
            // console.log("filter:", article.id, selectedCategory)
            return String(article?.category?.name) === String(selectedCategory)
        })
    }, [articles, selectedCategory])
}

const columns = [
    { key: 'id',dataIndex: "name", title: "Title"},
    { key: 'id',dataIndex: ["category", 'name'], title: "category"}
]

function BlogList() {

    const [selectedCategory, setSelectedCategory] = useState("")
    // 获取文章列表
    const { articles, articlesError} = useArticles()
    // console.log(articles)
    // 获取文章分类
    const { categories, categoriesError} = useCategories()
    // console.log(categories)
    // 组合数据
    const combined = useCombinedArticles(articles, categories)
    // 实现过滤
    const result = useFilteredArticles(combined, selectedCategory).map( v => ({...v, key: v.id}))
    // console.log(result)

    // 分类下拉框选项用于过滤
    const options = useMemo(() => {
        const arr = _.uniqBy(categories, c => c.name).map(c => ({ value: c.name, label: c.name}))
        arr.unshift({value: "", label: "All"})
        return arr
    }, [categories])
    
    // 如果出错，简单返回Failed
    if(articlesError || categoriesError) return "Failed"
    // 如果没有数据，说明正在加载...
    if(!result) return "Loading..."

    return (
        <div>
            <Select 
                value={selectedCategory}
                onChange={value => setSelectedCategory(value)}
                options={options}
                style={{width: '200px'}}
                placeholder="select a category"
            />
            <Table dataSource={result} columns={columns} />
        </div> 
    )
}


export default BlogList