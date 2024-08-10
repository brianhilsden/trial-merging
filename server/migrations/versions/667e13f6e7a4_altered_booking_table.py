"""Altered Booking table

Revision ID: 667e13f6e7a4
Revises: dd65282a68ca
Create Date: 2024-08-10 21:33:13.718017

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '667e13f6e7a4'
down_revision = 'dd65282a68ca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('destination', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('departure_time', sa.Time(), nullable=False))
        batch_op.add_column(sa.Column('current_address', sa.String(), nullable=False))
        batch_op.drop_column('total_cost')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('total_cost', sa.FLOAT(), nullable=True))
        batch_op.drop_column('current_address')
        batch_op.drop_column('departure_time')
        batch_op.drop_column('destination')

    # ### end Alembic commands ###
