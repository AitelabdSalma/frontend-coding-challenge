import React from 'react'
import { count_Date_Difference_In_Days } from '../../utils/timeUtils';
import './Card.css';


const Card = ({ ref, key, children }) => {

    const repository = children

    return (
        <div
            ref={ref}
            key={key}
            class="card">
            <div class="card__content">
                <img
                    src={repository.owner.avatar_url}
                    class="card__image"
                    alt="brown couch" />
            </div>
            <div class="card__content">
                <div class="card__title">{repository.name}</div>
                <div class="card__description">{repository.description}</div>
                <span class="card__button"> Stars : {repository.stargazers_count}</span>
                <span class="card__button"> Issues : {repository.has_issues ? repository.open_issues_count : 0}</span>
                <span class="card__time">
                    Submitted {count_Date_Difference_In_Days(repository.created_at)} days ago by {repository.owner.login}</span>

            </div>
        </div>
    )
}


export default Card



