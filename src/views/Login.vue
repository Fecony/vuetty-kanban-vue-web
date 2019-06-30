<template>
<section class="hero is-fullheight">
	<div class="hero-body">
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-5-tablet is-8-desktop is-5-widescreen">
					<div id="login">
						<div class="login-card">
							<div class="card-title">
								<h1>Please Sign In</h1>
							</div>
							<div class="content">
								<div v-if="response" class="has-text-danger">{{ response }}</div>
								<form @submit.prevent="login()">
									<div class="control">
										<div class="field">
											<label class="label" for="email">Email</label>
											<input class="input" id="email" type="email" v-model="user.email" v-validate="'required|email'"
												name="email" placeholder="Email" />
											<span v-show="errors.has('email')"
												class="help is-danger">{{ errors.first('email') }}</span>
										</div>
									</div>
									<div class="control">
										<div class="field">
											<label class="label" for="password">Password</label>
											<input class="input" id="password" type="password" v-model="user.password" v-validate="'required'"
												name="password" placeholder="Password" />
											<span v-show="errors.has('password')"
												class="help is-danger">{{ errors.first('password') }}</span>
										</div>
									</div>
									<div class="level options">
										<div class="checkbox level-left">
											<input type="checkbox" id="checkbox" class="regular-checkbox">
											<label for="checkbox">Remember me</label>
										</div>
										<a class="btn btn-link level-right" href="/register">Register?</a>
									</div>
									<button type="submit" class="btn btn-primary">Login</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
</template>

<script>
export default {
	data() {
		return {
			user: {
				email: "",
				password: ""
			},
			response: ''
		}
	},
	methods: {
		login() {
		let currentObject = this;
		currentObject.$validator.validateAll().then(isValid => {
			if (!isValid) {
				console.log('īnvalid')
			} else {
				this.$axios.post('http://localhost:3001/auth/login', this.user)
					.then(function (response) {
						currentObject.response = response.data;

						if (response.data.token) {
							currentObject.$router.push('/dashboard');
						}
					})
					.catch(function (error) {
						currentObject.response = 'Invalid username and/or password!';
					});
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
$primary:      hsl(171, 100%, 41%);
$grey-darker:  hsl(0, 0%, 21%);
$grey-dark:    hsl(0, 0%, 29%);
$grey:         hsl(0, 0%, 48%);
$grey-light:   hsl(0, 0%, 71%);
$grey-lighter: hsl(0, 0%, 86%);


#login {
	display: flex;
	align-items: center;
	justify-content: center;

	.login-card {
    background: #fff;
		width: 24rem;
		box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.11);
    width:100%;

		.card-title {
			background-color: darken($primary, 5%);
			padding: 2rem;

			h1 {
				color: #fff;
				text-align: center;
				font-size: 1.2rem;
			}
		}

		.content {
			padding: 6rem 5rem;
		}

		#email, #password {
			display: block;
			width: 100%;
			font-size: 1rem;
			margin-bottom: 1.75rem;
			padding: 0.25rem 0;
			border: none;
			border-bottom: 1px solid $grey-lighter;
			transition: all .5s;

			&:hover {
				border-color: $grey;
			}

			&:active, &:focus {
				border-color: $primary;
			}
		}

		.checkbox {
			color: $grey-light;
			font-size: 0.8rem;

			span {
				margin-left: 0.5rem;
			}
		}

		a {
			font-size: 0.8rem;
		}

		.options {
			color: $grey-light;
			margin-bottom: 1.5rem;
		}

		button {
      margin:auto;
			cursor: pointer;
			font-size: 1.2rem;
			color: $primary;
			border-radius: 4rem;
			display: block;
			width: 12rem;
			background: transparent;
			border: 2px solid $primary;
			padding: 0.9rem 0 1.1rem;
			transition: color .5s, border-color .5s;

			&:hover, &:focus {
				color: darken($primary, 10%);
				border-color: darken($primary, 10%);
			}

			&:active {
				transform: translateY(1px);
			}
		}
	}
}

input:focus,
select:focus,
textarea:focus,
button:focus {
	outline: none;
}
</style>