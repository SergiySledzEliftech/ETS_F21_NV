export default function ({ store, redirect, app, route }) {
  if (!app.$cookies.get('userToken') && route.path !== '/login') {
    return redirect('/login')
  }
}
