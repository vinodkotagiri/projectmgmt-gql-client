import React from 'react'
import { useMutation } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import { UPDATE_PROJECT } from '../mutations/projectMutations'
import { useState } from 'react'
export default function EditProjectForm({ project, setInUpdateState }) {
	const [updateData, setUpdateData] = useState({
		name: project.name,
		description: project.description,
		status: project.status,
	})
	const { name, description, status } = updateData
	const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { id: project.id, name, description, status },
		onCompleted: () => setInUpdateState(false),
		refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
	})
	const handleChange = (e) => {
		setUpdateData({ ...updateData, [e.target.name]: e.target.value })
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		if (name === '' || description === '') return alert('Please fill all fields')
		updateProject(name, description, status)
	}
	return (
		<div className='mt-5'>
			<h3>Update Project Details</h3>
			{project && (
				<form onSubmit={handleSubmit}>
					<div className='mb-3'>
						<label htmlFor='name' className='form-label'>
							Name
						</label>
						<input id='name' type='text' className='form-control' name='name' value={name} onChange={handleChange} />
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
							onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}>
							<option value='new'>Not Started</option>
							<option value='progress'>In Progress</option>
							<option value='completed'>Completed</option>
						</select>
					</div>
					<button type='submit' className='btn btn-primary'>
						Update
					</button>
				</form>
			)}
		</div>
	)
}
