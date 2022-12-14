import './QuestsList.scss'
import editIcon from '../../assets/editing.png'

const columns = [
  {
    header: "VS ID",
    key: "id"
  },
  {
    header: "Title",
    key: "title"
  },
  {
    header: "Description (VTML)",
    key: "desc"
  },
  {
    header: "Quest Giver",
    key: "giver"
  },
  {
    header: "Pre-requisit Quest",
    key: "preReqQuest"
  },
  {
    header: "Objectives",
    key: "objectives"
  },
  {
    header: "Reward Items",
    key: "rewardItems"
  },
  {
    header: "Scope",
    key: "perPlayer"
  },
  {
    header: "Cooldown Hours",
    key: "cooldown"
  },
  {
    header: '',
    key: 'edit'
  }
]

export const QuestsList = ({
  quests,
  setFormIsOpen,
  setSelectedQuest,
}) => {

  return (
    <table className="quests-list">
      <thead>
        <tr>
          {columns?.map(column => (
            <th key={`column-header-${column.header.split(" ").join("")}`}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {quests?.map(row => (
          <tr key={`row-${row.id.split(" ").join("")}`}>
            <td>
              {row?.id || ''}
            </td>

            <td>
              {row?.title || ''}
            </td>

            <td className='description'>
              {row?.description || ''}
            </td>

            <td>
              {row?.questGiverId || ''}
            </td>

            <td>
              {row?.preReqQuestIds || ''}
            </td>

            <td className="objectives">
              {row?.gatherObjectives?.map((objective, i) => (
                <article 
                  key={`gatherObjective-${i}`} 
                  className="gatherObjective"
                >
                  <p className="objective-type">
                    Gather a total of 
                    <b className="item-quantity">
                      {objective?.demand || 0}
                    </b> 
                    of the following items: 
                  </p>
                  <ul>
                    {objective?.ids?.map(id => (
                      <li key={`gatherObjectiveItem-${id}`}>
                        {id}
                      </li>
                    ))}
                  </ul>
                  {objective?.description && (
                    <>
                      <b className="objective-desc-title"><u>Gather Objective Description (VTML):</u></b>
                      <p className="objective-desc">
                        <i>{objective.description}: 0/{objective.demand}</i>
                      </p>
                    </>
                  )}
                </article>
              ))}

              {row?.killObjectives?.map((objective, i) => (
                <article 
                  key={`killObjective-${i}`} 
                  className="killObjective"
                >
                  <p>
                    Kill a total of 
                    <b className="kill-quantity">
                      {objective?.quantity || 0}
                    </b> 
                    of the following mobs: 
                  </p>
                  <ul>
                    {objective?.ids?.map(id => (
                      <li key={`killObjectiveMob-${id}`}>
                        {id}
                      </li>
                    ))}
                  </ul>
                  {objective?.description && (
                    <>
                      <b><u>Objective Description (VTML):</u></b>
                      <p>
                        <i>{objective.description}: 0/{objective.demand}</i>
                      </p>
                    </>
                  )}
                </article>
              ))}
            </td>

            <td>
              <ul>
                {row?.rewardItems?.map(item => (
                  <li key={`rewardItem-${item.itemCode}`}>
                    {item.amount} x {item.itemCode}
                  </li>
                ))}
              </ul>
            </td>

            <td>
              {!!row?.perPlayer ? "Individual Player Quest" : "Serverwide Quest"}
            </td>

            <td>
              {row?.cooldown || ''}
            </td>

            <td>
              <button
                className="edit-button"
                onClick={() => {
                  setSelectedQuest(row)
                  setFormIsOpen(true)
                }}
              >
                <img
                  alt="edit quest"
                  title="edit quest"
                  src={editIcon}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
