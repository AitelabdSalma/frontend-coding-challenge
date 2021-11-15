import React from 'react'
import { count_Date_Difference_In_Days, formatNumbersInThousands } from '../../utils/timeUtils';
import './Card.css';


const Card = ({ repository }) => {
    const { owner, name, description, has_issues, open_issues_count, stargazers_count, created_at } = repository
    const propsCard = {
        className: "card"
    }
    return (
        <div {...propsCard} >
            <div className="card__image">
                <img src={owner.avatar_url} alt="brown couch" />
            </div>
            <div className="card__content">
                <div className="card__title">{name}</div>
                <div className="card__description">{description}</div>
                <span className="card__label stars"> Stars : {formatNumbersInThousands(stargazers_count)}</span>
                <span className="card__label issues"> Issues : {has_issues ? formatNumbersInThousands(open_issues_count) : 0}</span>
                <span className="card__time"> Submitted {count_Date_Difference_In_Days(created_at)} days ago by {owner.login}</span>
            </div>
        </div>
    )
}


export default Card



