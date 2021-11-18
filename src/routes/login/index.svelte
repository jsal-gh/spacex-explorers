<script>
    import {post, browserSet} from '$lib/req_utils'

    let username
    let password
    async function handleLogin() {
        const json = await post(fetch, 'http://localhost:1337/auth/local', {
            identifier: username, 
            password,
        })
        if(json.jwt) {
            browserSet('jwt', json.jwt)
        }
    }
</script>

<div class="m-8">
    <input type="text" bind:value={username} name="username" placeholder="Username" />
    <input type="password" bind:value={password} name="password" placeholder="Password" />
    
    <button on:click={handleLogin}>Login</button>
    
</div>