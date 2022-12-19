import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { GET_CLIENTS } from '../queries/clientQueries'
import { GET_PROJECTS } from '../queries/projectQueries'
import { ADD_PROJECT } from '../mutations/projectMutations'
export default function AddProjectModal() {
	const initialState = {
		name: '',
		description: '',
		status: 'new',
		clientId: '',
	}

	//Get clients
	const { loading, error, data } = useQuery(GET_CLIENTS)
	const [newProject, setNewProject] = useState(initialState)
	const { name, description, status, clientId } = newProject
	const [addProject] = useMutation(ADD_PROJECT, {
		variables: { name, description, status, clientId },
		refetchQueries: [{ query: GET_PROJECTS }],
	})
	const handleChange = (e) => {
		setNewProject({ ...newProject, [e.target.name]: e.target.value })
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		console.table(newProject)
		if (name === '' || description === '' || clientId === '') return alert('Please fill all fields')
		addProject(name, description, status, clientId)
		setNewProject(initialState)
	}
	if (loading) return null
	if (error) return <p>Something went wrong..</p>
	return (
		<>
			<button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#projectModal'>
				<div className='d-flex align-items-center'>
					<FaList className='icon' />
					<div>New Project</div>
				</div>
			</button>
			<div
				className='modal fade'
				id='projectModal'
				tabIndex='-1'
				aria-labelledby='projectModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='projectModalLabel'>
								New Project
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
										Description
									</label>
									<textarea
										id='description'
										className='form-control'
										name='description'
										value={description}
										onChange={handleChange}></textarea>
								</div>
								<div className='mb-3'>
									<label htmlFor='status' className='form-label'>
										Status
									</label>
									<select
										className='form-select'
										id='status'
										value={status}
										onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}>
										<option value='new'>Not Started</option>
										<option value='progress'>In Progress</option>
										<option value='completed'>Completed</option>
									</select>
								</div>
								<div className='mb-3'>
									<label htmlFor='clientId' className='form-label'>
										Client
									</label>
									<select
										className='form-select'
										id='clientId'
										value={clientId}
										onChange={(e) => setNewProject({ ...newProject, clientId: e.target.value })}>
										<option value=''>Select Client</option>
										{data.clients.map((client) => (
											<option key={client.id} value={client.id}>
												{client.name}
											</option>
										))}
									</select>
								</div>
								<button className='btn btn-primary' type='submit' data-bs-dismiss='modal'>
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
