export default function ({ store, redirect, app, route }) {
  if (!app.$cookies.get('userToken') && route.path !== '/login' && route.path !== '/register') {
    return redirect('/login/')
  }
}
