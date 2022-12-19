import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { GET_PROJECTS } from '../queries/projectQueries'
import { useMutation } from '@apollo/client'
import { DELETE_PROJECT } from '../mutations/projectMutations'
export default function DeleteProjectBtn({ projectId }) {
	const navigate = useNavigate()
	const [handleDelete] = useMutation(DELETE_PROJECT, {
		variables: { id: projectId },
		onCompleted: () => navigate('/'),
		refetchQueries: [{ query: GET_PROJECTS }],
	})
	return (
		<div className='d-flex mt-5 ms-auto justify-content-center align-items-center'>
			<button className='btn btn-danger m-2' onClick={handleDelete}>
				<FaTrash className='icon me-2' />
				DELETE PROJECT
			</button>
		</div>
	)
}
