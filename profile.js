const https = require('https')
let get = (username) => {
	const options = {
		hostname: `api.github.com`,
		port: 443,
		path: `/users/${username}`,
		method: 'GET',
		headers: {
			'user-agent': 'nodejs'
		}
	}

	let request = https.request(options, (response) => {
		let body = ''
		response.on('data', (data) => {
			body = body + data
		})

		response.on('end', () => {
			let profile = JSON.parse(body)

			if(profile.message !== 'Not Found') {
				printData(profile)
			} else {
				console.log('User not found')
			}
		})
	})

	let printData = (profile) => {
		console.log(`${profile.name} owns ${profile.public_repos} repo(s) and has ${profile.followers} follower(s)`)
	}

	request.end()

	request.on('error', (e) => {
		console.log(e)
	})
}

module.exports.get = get