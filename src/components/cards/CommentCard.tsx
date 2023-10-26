import { MdStar } from 'react-icons/md'

type BookReview = {
  readonly body: string,
  readonly rating: number,
  readonly user: any
  readonly fromLoggedUser: boolean
  readonly lastUpdateFormat: string
}


type CommentCardProps = {
  info: BookReview
}


export default function CommentCard({ info }: CommentCardProps) {
  return (
    <div className='commentCard_main'>
      <div className='h5_b_secondary'>
        { `${info.user.name ? `${info.user.name} - ` : ''}${info.user.email}` }
      </div>

      <div className='commentCard_body'>
        { info.body }
      </div>

      <div className='commentCard_bottom'>
        <div className='commentCard_bottom_rating'>
          <div className='h5_b_secondary'>
            { info.rating.toFixed(1) }
          </div>
          <MdStar className='h4_b_secondary' />
        </div>

        <div className='h6_r_terciary'>
          { info.lastUpdateFormat }
        </div>
      </div>
    </div>
  )
}
