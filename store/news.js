import { serverUrl } from '../utils/config'

export const state = () => ({
	news: [],
	article:{
    "news_url": "https://www.coinbureau.com/news/sec-chair-gary-gensler-says-bitcoin-in-competition-with-us-banking-system/",
    "image_url": "https://crypto.snapi.dev/images/v1/c/m/bitcoinincompetitionwithusbankingsystem-1024x614-85524.jpg",
    "title": "SEC Chair Gary Gensler Says Bitcoin in Competition with US Banking System",
    "text": "Gary Gensler, head of the U.S. Securities and Exchange Commission (SEC), has alluded to the idea that Bitcoin is in competition with the American financial system and its global consensus. Speaking with former SEC Chairman Jay Clayton at the DACOM 2021 conference, Gensler said Satoshi's original idea for Bitcoin has ultimately become at odds with […] The post SEC Chair Gary Gensler Says Bitcoin in Competition with US Banking System appeared first on Coin Bureau.",
    "source_name": "Coinbureau",
    "date": "Thu, 02 Dec 2021 10:36:24 -0500",
    "topics": [
        "regulations"
    ],
    "sentiment": "Negative",
    "type": "Article",
    "tickers": [
        "BTC"
    ]
	},	
	selectedArticles: [],
    viewedArticle: {},
    currencies: [],
    toggledCurrencies: [],
    showDialog: false,
    deleteAllArticles: false,
})



export const actions = {
	async fetchNews (ctx) {

        if(!ctx.state.news.length) {
            try {
                const api = `${serverUrl}/news?tickers=BTC,ETH&items=30`
                this.$axios.setToken(this.$cookies.get('userToken'), 'Bearer')
                const news = await this.$axios.$get(api);
        	    ctx.commit('populateNews', news)
            } catch (error) {
                return {error}
            }
        } else {
        	return ctx.getters.getNews
        }
			
	},
	async getSelectedArticles (ctx) {
		ctx.commit('getSelectedArticles')
	},
	async populateSelectedArticles(ctx) {
        let articles = await this.$db.collection('articles').get();
        articles = articles.filter(item => {
            if (item.selected) {
                return item
            } else {
                this.$db.collection('articles').doc({title: item.title}).delete()
            }
        })
		ctx.commit('populateSelectedArticles', articles)
	},
    async addToSelectedArticles (ctx, id) {

        const savedArticle = await this.$db.collection('articles').doc({id}).get().then(articles => {
			return articles
		})

        if (savedArticle == undefined) {




            let article
            if ( ctx.state.news.length) {
                article = ctx.state.news.filter(article => article.id == id)[0]
                article.selected = !article.selected
                ctx.commit('addToSelectedArticles', article)
                await this.$db.collection('articles').add({...article})
            } else {
                const api = `${serverUrl}/news/${id}`
                this.$axios.setToken(this.$cookies.get('userToken'), 'Bearer')
                article = await this.$axios.$get(api);
                article.selected = !article.selected;
                ctx.commit('addToSelectedArticles', article)
                await this.$db.collection('articles').add({...article})
            }
        } else {
            ctx.commit(`deleteSelectedArticles`, id)
            await this.$db.collection('articles').doc({id}).delete()
        }
    },
    async deleteAllArticles(ctx) {
        if(!ctx.state.selectedArticles.length) {
            try {
			await this.$db.collection('articles').delete()
            } catch (err) {
                console.log(err)
            }	
        }
	},
    async deleteArticle(ctx, id) {
        await this.$db.collection('articles').doc({id}).delete()
        ctx.commit('deleteArticle', id)
    },
    async getArticleById(ctx, id) {
        
        let savedArticle = await this.$db.collection('articles').get();
        savedArticle = await savedArticle.filter(item => item.id == id)

        if(savedArticle.length) {
            ctx.commit('populateViewedArticle', savedArticle[0])
        } else {

            if(!ctx.state.news.length) {
                try {
                    const api = `${serverUrl}/news/${id}`
                    this.$axios.setToken(this.$cookies.get('userToken'), 'Bearer')
                    const article = await this.$axios.$get(api);
            
                    ctx.commit('populateViewedArticle', article)
                } catch (error) {
                    return {error}
                } 
            } else {
                const article = ctx.state.news.filter(item => item.id == id)[0]
                ctx.commit('populateViewedArticle', article)

            }

              
        }

    },
    async toggleCurrency(ctx, symbol) {
        let isStackFull = 0;
        ctx.state.currencies.map((item) => {
            if(item.toggled) {
                isStackFull++
            } else {
                isStackFull--
            }
        })

        if (isStackFull < 4) {
            ctx.commit('toggleCurrency', symbol)

        }
    },
    async fetchCurrencies(ctx) {
        let arrayOfTitles = ['BTC', 'BCH', 'LTC', 'ETH', 'BNB', 'USDT', 'SOL', 'USDC', 'XRP', 'DOT']
        try {
            arrayOfTitles.forEach(async (title) => {
                let api = `${serverUrl}/currency/logo?symbol=${title}`
                this.$axios.setToken(this.$cookies.get('userToken'), 'Bearer')
                const currencyLogo = await this.$axios.$get(api)

                this.$axios.setToken(this.$cookies.get('userToken'), 'Bearer')
                api = `${serverUrl}/currency?symbol=${title}` 
                const currency = await this.$axios.$get(api);
                ctx.commit('populateCurrencies', {currency, title, currencyLogo})
            })
      } catch (error) {
        return error
      }
    },

    async toggleDialog(ctx) {
        ctx.commit('toggleDialog')
        if (ctx.state.deleteAllArticles) {
            ctx.dispatch('deleteAllArticles')
        }
    },
    async toggleShowDialog(ctx) {
        ctx.commit('toggleShowDialog')

    },
    async toggleCloseDialog(ctx, status) {
        ctx.commit('toggleCloseDialog', status)
        ctx.dispatch('deleteAllArticles')
    }
}


export const mutations = {
	populateNews (state, news) {
		state.news = news
	},
	getSelectedArticles (state) {
		state.selectedArticles = this.$db.collection('articles').get()
	},
	populateSelectedArticles(state, articles) {
		state.selectedArticles = [...articles]
	},
    addToSelectedArticles(state, article) {
       state.selectedArticles.push(article) 
    },
    deleteAllArticles(state) {
        // state.selectedArticles = []
    },
    deleteSelectedArticles(state,id) {
        
        state.selectedArticles = state.selectedArticles.filter(item => {
                if (item.id != id) {
                    return item 
                }
        })
    },
    deleteArticle(state, id) {
        state.selectedArticles = state.selectedArticles.filter(item => item.id != id)
        
    },
    populateViewedArticle(state, article) {
 
        state.viewedArticle = {...article}
    },
    toggleCurrency(state, symbol) {

        let isThereDuplicate = false

        state.toggledCurrencies.forEach(item => {
            if(item.title == symbol) {
                isThereDuplicate = true
            }
        })

        if (isThereDuplicate) {
             state.toggledCurrencies = state.toggledCurrencies.filter(item => item.title != symbol)   
        } else {
            if (state.toggledCurrencies.length < 4) {
                state.toggledCurrencies.push(state.currencies.filter(item => item.title == symbol)[0])
            }
            
        }
        
        

        

        

    },
    populateCurrencies(state, payload) {
        const currencyInfo = payload.currency[payload.title]

        const currencyObject = {
            name: currencyInfo.name,
            title: currencyInfo.symbol,
            img: `${payload.currencyLogo}`,
            price: Math.round((currencyInfo.quote.USD.price + Number.EPSILON) * 100) / 100,
            change: Math.round((currencyInfo.quote.USD.percent_change_24h + Number.EPSILON) * 100) / 100,
            toggled: false
        }

        state.currencies.push(currencyObject)

        if(state.toggledCurrencies.length < 3) {
            state.toggledCurrencies.push(currencyObject)
        } 

    },
    toggleShowDialog(state) {
        
        state.showDialog = true
    },
    toggleCloseDialog(state, status) {
        if(status == 'success') {
            state.showDialog = false
            state.selectedArticles = []
        } else {
            state.showDialog = false
        }
        
    },


}

export const getters = {
	 selectArticle (state) {
		return  function(id) {
			const article = state.news.filter(item => {
				if (item.title == id) {
                    item.selected = false
                    return item
				}
			})
			return article 
		}
	},
    getNews(state) {
        return state.news
    },

}