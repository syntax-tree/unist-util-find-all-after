import {expectType} from 'tsd'
import type {
  Heading,
  PhrasingContent,
  Root,
  RootContent,
  RowContent,
  TableCell,
  TableRow,
  Text
} from 'mdast'
import {findAllAfter} from './index.js'

const text: Text = {type: 'text', value: 'alpha'}
const heading: Heading = {type: 'heading', depth: 1, children: [text]}
const root: Root = {type: 'root', children: [heading]}
const cell: TableCell = {type: 'tableCell', children: [text]}
const row: TableRow = {type: 'tableRow', children: [cell]}

// @ts-expect-error: parent needed.
findAllAfter()

// @ts-expect-error: child or index needed.
findAllAfter(heading)

findAllAfter(
  // @ts-expect-error: parent needed.
  text,
  0
)

expectType<PhrasingContent[]>(findAllAfter(heading, text))

expectType<Text[]>(findAllAfter(heading, text, 'text'))

expectType<Text[]>(findAllAfter(heading, 0, 'text'))

expectType<RootContent[]>(findAllAfter(root, 0))

expectType<Text[]>(findAllAfter(root, 0, 'text'))

expectType<RowContent[]>(findAllAfter(row, 0))
