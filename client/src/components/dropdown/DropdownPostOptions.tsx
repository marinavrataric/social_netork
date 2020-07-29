import React, { ChangeEvent } from 'react'
import { Dropdown } from 'reactstrap';

function DropdownPostOptions({ post, setVisible, dropdownValue, setdropdownValue }: any) {
    return (
        <div className="dropdown">
            <Dropdown onClick={() => setVisible(post._id)}>
                {post.visibility === 'Public' ?
                    <select
                        value={dropdownValue}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setdropdownValue(e.target.value)}>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                    :
                    <select
                        value={dropdownValue}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setdropdownValue(e.target.value)}>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>}
            </Dropdown>
        </div>
    )
}

export default DropdownPostOptions
