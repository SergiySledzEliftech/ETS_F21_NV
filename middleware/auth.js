export default function ({ $auth, store, redirect }) {
  const user = $auth.user
  if (process.client && !user.isLoggedIn) { return redirect('/login') }
}
