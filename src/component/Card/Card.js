import React from 'react'
import { count_Date_Difference_In_Days, formatNumbersInThousands } from '../../utils/timeUtils';
import './Card.css';


const Card = ({ ref, key, children }) => {

    const repository = children

    return (
        <div
            ref={ref}
            key={key}
            class="card">
            <div className="card__image">
                <img src={repository.owner.avatar_url} alt="brown couch" />
            </div>
            <div className="card__content">
                <div className="card__title">{repository.name}</div>
                <div className="card__description">{repository.description}</div>
                <span className="card__label stars"> Stars : {formatNumbersInThousands(repository.stargazers_count)}</span>
                <span className="card__label issues"> Issues : {repository.has_issues ? formatNumbersInThousands(repository.open_issues_count) : 0}</span>
                <span className="card__time">
                    Submitted {count_Date_Difference_In_Days(repository.created_at)} days ago by {repository.owner.login}</span>

            </div>
        </div>
    )
}


export default Card



