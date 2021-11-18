<script>
import { get_all_dirty_from_scope } from "svelte/internal";

    import {onMount} from 'svelte' 
    let name

    onMount(async() => {
        const res = await fetch('http://localhost:1337/users/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem(jwt),
            }
        })
        const json = await res.json()
        name = json.name
    })
</script>

<h2>{name}</h2>