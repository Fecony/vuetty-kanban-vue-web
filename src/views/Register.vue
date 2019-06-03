<template>
  <section class="hero is-fullheight">
		<div class="hero-body">
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-5-tablet is-8-desktop is-5-widescreen">
					<div id="login">
						<div class="login-card">
							<div class="card-title">
								<h1>Please Register</h1>
							</div>
							<div class="content">
								<form @submit="register">
									<div class="field">
                    <label class="label level-left" for="email">Email</label>
										<div class="control">
											<input class="input" v-model.lazy="email" v-validate="'email|required'" type="email" name="email" placeholder="Email">
											<span class="icon is-small is-left">
												<i class="fa fa-envelope"></i>
											</span>
											<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
										</div>
									</div>
									<div class="field">
										<div class="control">
                      <label class="label level-left" for="password">Password</label>
												<input class="input" v-model.lazy="password" v-validate="'required|min:8'" type="password" name="password" placeholder="Password">
												<span class="icon is-small is-left">
													<i class="fa fa-envelope"></i>
												</span>
                        <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
										</div>
									</div>
                  <div class="field">
										<div class="control">
                      <label class="label level-left" for="confirmPassword">Confirm Password</label>
												<input class="input" v-model="confirmPassword" v-validate="'required|confirmed:password'" 
                        type="password" name="confirmPassword" placeholder="Confirm Password" data-vv-as="password">
												<span class="icon is-small is-left">
													<i class="fa fa-envelope"></i>
												</span>
                        <span v-show="errors.has('confirmPassword')" class="help is-danger">{{ errors.first('confirmPassword') }}</span>
										</div>
									</div>
									<div class="level-right options">
										<a class="btn btn-link" href="/">Login?</a>
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
    data(){
      return {
        email : "",
        password : "",
        confirmPassword : ""
      }
    },
     methods: {
      register(e) {
        const email = this.email 
        const password = this.password
        const confirmPassword = this.confirmPassword
                e.preventDefault();
                let currentObj = this;
                this.axios.post('http://localhost:3001/auth/register', {
                    email = this.email,
                    password = this.password,
                    confirmPassword = this.confirmPassword
                })
                .then(function (response) {
                    currentObj.output = response.data;
                })
                .catch(function (error) {
                    currentObj.output = error;
                });

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

label {
	cursor: pointer;
}

.regular-checkbox {
	display: none;
}

.regular-checkbox + label {
	background-color: #fafafa;
	border: 1px solid $grey-lighter;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05);
	padding: 7px;
	border-radius: 3px;
	display: inline-block;
	position: relative;
}

.regular-checkbox:checked + label {
	background-color: #e9ecee;
}

.regular-checkbox:checked + label:after {
	content: '\2714';
	font-size: 11px;
	position: absolute;
	top: 0;
	left: 3px;
	color: $grey-light;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
	outline: none;
}
</style>

<script>
  export default {
    data(){
      return {
        email : "",
        password : ""
      }
    },
    methods: {
      login: function () {
        const email = this.email 
        const password = this.password
        this.$store.dispatch('login', { email, password }).then(() => this.$router.push('/'))
      }
    }
  }
</script>