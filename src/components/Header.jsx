import React from 'react'
import logo from '../assets/logo-gql.svg'
export default function Header() {
	return (
		<nav className='navbar bg-light mb-4 p-0'>
			<div className='container'>
				<a href='/' className='navbar-brand'>
					<div className='d-flex'>
						<img src={logo} alt='logo' className='mr-2' />
						<div>Project Mgmt</div>
					</div>
				</a>
			</div>
		</nav>
	)
}
