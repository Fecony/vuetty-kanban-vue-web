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
  								<transition name="fade">
  									<div class="notification is-success"
  										v-if="response && closeNotification || respError && closeNotification"
  										v-bind:class="{ 'is-danger': hasError }">
  										<button class="delete" @click="close()"></button>
  										<p>
  											{{ response }}
  											{{ respError }}
  										</p>
  									</div>
  								</transition>
  								<form @submit.prevent="register()">
  									<div class="control">
  										<div class="field">
  											<label class="label" for="email">Email</label>
  											<input class="input" id="email" type="email" v-model="user.email"
  												v-validate="'required|email'" name="email" placeholder="Email" />
  											<span v-show="errors.has('email')"
  												class="help is-danger">{{ errors.first('email') }}</span>
  										</div>
  									</div>
  									<div class="control">
  										<div class="field">
  											<label class="label" for="password">Password</label>
  											<input class="input" id="password" type="password"
  												v-model="user.password" v-validate="'required|min:8'" ref="password" name="password"
  												placeholder="Password" />
  											<span v-show="errors.has('password')"
  												class="help is-danger">{{ errors.first('password') }}</span>
  										</div>
  									</div>
  									<div class="control">
  										<div class="field">
  											<label class="label" for="cPassword">Password</label>
  											<input class="input" id="cPassword" type="password" v-model="cPassword"
  												v-validate="'required|confirmed'" data-vv-as="password"
  												name="cPassword" placeholder="Confirm Password" />
  											<span v-show="errors.has('cPassword')"
  												class="help is-danger">{{ errors.first('cPassword') }}</span>
  										</div>
  									</div>
  									<div class="level options">
										<div class="checkbox level-left">
											<input type="checkbox" id="checkbox" class="regular-checkbox">
											<label for="checkbox">Remember me</label>
										</div>
										<a class="btn btn-link level-right" href="/">Login?</a>
									</div>
  									<button type="submit" class="btn btn-primary">Register</button>
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
  				password: "",

  			},
  			cPassword: "",
  			response: "",
  			respError: "",
  			hasError: false,
  			closeNotification: false

  		}
  	},
  	methods: {
  		register() {
  			this.closeNotification = true;
  			let currentObject = this;
  			this.$axios.post('http://localhost:3001/auth/register', this.user)
  				.then(function (response) {
  					if (!response.data.msg) {
  						currentObject.response = '';
  						currentObject.hasError = true;
  						currentObject.respError = response.data.error;
  					} else {
  						currentObject.hasError = false;
  						currentObject.response = response.data.msg;
  						currentObject.respError = '';
  						this.$router.push('/');
  					}
  				})
  				.catch(function (error) {
  					// console.log(error);
  				});
  		},
  		close() {
  			this.closeNotification = false;
  		},
  		validateForm() {
  			this.$validator.validateAll();
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


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

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
			margin-top: 1.5rem;
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

label {
	cursor: pointer;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
	outline: none;
}
</style>