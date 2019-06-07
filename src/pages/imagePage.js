import React from 'react'
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Image from '../components/image'
import NewComment from '../components/add_comment';
import getPhotoById from '../request/getPhotoById';
import CommentBox from '../components/commentBox';
import NoSinglePhotoAPI from '../components/notices/NoSinglePhotoAPI';

class ImagePage extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			photo: props.photo || null,
			direct_link: props.direct_link || null
		}

		this.getPhoto = this.getPhoto.bind(this)

	}

	render() {
		return (
			<div>
				{(!this.state.direct_link) ? (
					<Image {...this.state.photo} ></Image>
				) : (
						<NoSinglePhotoAPI href={this.state.direct_link} />
					)}
				<CommentBox photoId={this.state.photo ? this.state.photo.id : null} />
			</div>
		)
	}

	getPhoto() {
		let id = this.props.match.params.id.split(':')[1];
		console.log('id', this.props.match, this.props.photoCache);
		let photo;

		if (this.props.photoCache) {
			photo = this.props.photoCache[id];
		}
		if (this.props.photos && !photo) {
			let filterePhotos = this.props.photos.filter(photo => photo.id == id)

			photo = filterePhotos[0] ? filterePhotos[0] : null;
		}

		if (!photo) {

			let source_name = this.props.match.params.id.split(':');
			source_name = (source_name && source_name[0]) ? source_name[0].toLowerCase() : null;

			if (source_name) {
				getPhotoById(id, source_name)
					.then(photoData => {
						let photo = photoData;

						if (photo) {
							this.props.onPhotoCacheUpdate(photo, id)
							this.setState({
								photo: photo
							})
						} else {
							this.setState({
								direct_link: `https://pixabay.com/en/photos/${id}/`
							})
						}
					})
			}

		}

		if (photo)
			this.props.onPhotoCacheUpdate(photo, id)

		if (photo)
			this.setState({
				photo: photo
			})

	}

	componentDidMount() {
		console.log('didMount', this.state);

		// this.getPhoto()
	}

	componentDidUpdate() {
		console.log('didUpdate', this.state);

		// this.getPhoto()
	}

}

const GQLImagePage = (props) => {

	let id = props.match.params.id.split(':')[1];
	let source_name = props.match.params.id.split(':');
	source_name = (source_name && source_name[0]) ? source_name[0].toLowerCase() : null;

	return (
		<Query
			variables={{ id: id, source_name: source_name }}
			query={gql`
				query Photo($id: String, $source_name: String){
					photo(id:$id,source_name:$source_name){
						author_name,
						main_image_link,
						source_link,
						author_link,
						source_name,
						description
					}
				}
			`}
		>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error :(</p>;

				if (data.photo.main_image_link)
					return <ImagePage {...props} photo={data.photo} />
				else
					return <ImagePage {...props} direct_link={`https://pixabay.com/en/photos/${id}/`} />
			}}
		</Query>
	)
}

export default GQLImagePage;