import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'
export default function AddClientModal() {
	const initialState = {
		name: '',
		email: '',
		phone: '',
	}
	const [newClient, setNewClient] = useState(initialState)
	const { name, email, phone } = newClient
	const [addClient] = useMutation(ADD_CLIENT, {
		variables: { name, email, phone },
		update(cache, { data: { addClient } }) {
			const { clients } = cache.readQuery({ query: GET_CLIENTS })
			cache.writeQuery({
				query: GET_CLIENTS,
				data: { clients: [...clients, addClient] },
			})
		},
	})
	const handleChange = (e) => {
		setNewClient({ ...newClient, [e.target.name]: e.target.value })
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		if (name === '' || email === '' || phone === '') return alert('Please fill all fields')
		addClient(name, email, phone)
		setNewClient(initialState)
	}
	return (
		<>
			<button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#clientModal'>
				<div className='d-flex align-items-center'>
					<FaUser className='icon' />
					<div>Add Client</div>
				</div>
			</button>
			<div className='modal fade' id='clientModal' tabIndex='-1' aria-labelledby='clientModalLabel' aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='clientModalLabel'>
								Add Client
							</h5>
							<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							<form onSubmit={handleSubmit}>
								<div className='mb-3'>
									<label htmlFor='name' className='form-label'>
										Name
									</label>
									<input
										id='name'
										type='text'
										className='form-control'
										name='name'
										value={name}
										onChange={handleChange}
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='email' className='form-label'>
										Email
									</label>
									<input
										id='email'
										type='text'
										className='form-control'
										name='email'
										value={email}
										onChange={handleChange}
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='phone' className='form-label'>
										Phone
									</label>
									<input
										id='phone'
										type='text'
										className='form-control'
										name='phone'
										value={phone}
										onChange={handleChange}
									/>
								</div>
								<button className='btn btn-secondary' type='submit' data-bs-dismiss='modal'>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
