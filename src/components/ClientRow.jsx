import { useMutation } from '@apollo/client'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'
export default function ClientRow({ client }) {
	const { id, name, email, phone } = client
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: { id },
		refetchQueries: [{ query: GET_CLIENTS }],
		// update(cache, { data: { deleteClient } }) {
		// 	const { clients } = cache.readQuery({ qurey: GET_CLIENTS })
		// 	cache.writeQuery({
		// 		query: GET_CLIENTS,
		// 		data: { clients: clients.filter((client) => client.id !== deleteClient.id) },
		// 	})
		// },
	})
	return (
		<tr>
			<td>{name}</td>
			<td>{email}</td>
			<td>{phone}</td>
			<td>
				<button className='btn btn-danger btn-sm' onClick={deleteClient}>
					<FaTrash />
				</button>
			</td>
		</tr>
	)
}
