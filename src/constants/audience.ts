import { ApiTxnTypes } from '../types/api';

const UserTransactionTypes = [ApiTxnTypes.PublisherCreate, ApiTxnTypes.PublisherPayout];
const AdminTransactionTypes = [ApiTxnTypes.CampaignCreate, ApiTxnTypes.CampaignEnd];
const TransactionType = [...UserTransactionTypes, ...AdminTransactionTypes];

export { UserTransactionTypes, AdminTransactionTypes, TransactionType };
